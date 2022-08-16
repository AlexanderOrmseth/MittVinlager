import { RadioGroup } from "@headlessui/react";
import { Check, DownloadSimple, LinkSimpleHorizontal } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import LoadingButton from "./LoadingButton";
import { useGetVinmonopoletWineQuery } from "../services/vinmonopoletApi";
import { WineFormData } from "../../features/wine/form/validationSchema";
import toast from "react-hot-toast";
import { Simulate } from "react-dom/test-utils";
import { z } from "zod";
import input = Simulate.input;

interface Props {
  setIsOpen: (value: boolean) => void;
  productId?: string | null;
  setValues: UseFormReset<WineFormData> | ((values: WineFormData) => void);
  isWishlist: boolean;
  setValue?: UseFormSetValue<WineFormData>;
  getValues?: UseFormGetValues<WineFormData>;
}

interface ErrorFromServer {
  detail?: string | null;
  title?: string | null;
  type?: string | null;
  status?: number | null;
}

const checkProductId = (val?: string): boolean =>
  val ? /^\d+$/.test(val) : false;
const productIdSchema = z
  .string({ required_error: "Varenummer/link kan ikke være tom." })
  .trim()
  .min(2, "Varenummer/link må minst ha 2 bokstaver.")
  .transform((val) => {
    if (val.includes("vinmonopolet.no/") && val.includes("/p/")) {
      return val.split("/p/")[1];
    }
    return val;
  })
  .refine(checkProductId, { message: "Varenummer/link er ugyldig!" });

const radioValues = [
  {
    value: 1,
    title: "Alle verdier",
    description: "Henter og erstatter alle verdier",
  },
  {
    value: 2,
    title: "Kun pris",
    description: "Erstatter kun verdien til pris",
  },
  {
    value: 3,
    title: "Ignorer brukerdetaljer",
    description: "Henter og erstatter alle verdier untatt brukerdetaljer",
  },
];

const Vinmonopolet = ({
  setValues,
  productId,
  setIsOpen,
  setValue,
  getValues,
  isWishlist,
}: Props) => {
  const [skip, setSkip] = useState(true);
  const [id, setId] = useState("");
  const { data, ...status } = useGetVinmonopoletWineQuery(id, { skip });

  const [inputValue, setInputValue] = useState<string>(productId || "");
  const [error, setError] = useState<string | null>(null);
  const [resetAction, setResetAction] = useState(1);

  useEffect(() => {
    if (status.isError && status.error && "data" in status.error) {
      const err = status.error.data as ErrorFromServer;
      const message = err.title ?? "Kunne ikke hente data fra vinmonopolet.";
      setError(message);
      toast.error(message);
      setInputValue("");
      setSkip(true);
    }
  }, [status.isError, status.error]);

  const handleSetValues = useCallback(
    (data: WineFormData) => {
      if (isWishlist) {
        setValues(data);
      } else if (setValue && getValues) {
        switch (resetAction) {
          case 1: // reset entire form
            setValues(data);
            break;
          case 2: // replace price
            setValue("price", data.price);
            break;
          case 3: // reset everything but except userDetails
            const { userDetails, ...rest } = data;
            setValues({ ...rest, userDetails: getValues("userDetails") });
            break;
          default: // reset entire form
            setValues(data);
            break;
        }
      }
    },
    [getValues, resetAction, isWishlist, setValue, setValues]
  );

  useEffect(() => {
    if (data && status.isSuccess) {
      // transform response to satisfy formData
      const _data: WineFormData = {
        ...data,
        file: null,
        resetImage: false,
        userDetails: { ...data.userDetails, purchaseDate: null },
      };

      toast.success(`Hentet ${data.name}`);
      handleSetValues(_data);
      console.log(data);
      setSkip(true);
      setIsOpen(false);
    }
  }, [data, status.isSuccess, handleSetValues, setIsOpen]);

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === "Enter") handleFetchWine();
  };

  const handleFetchWine = async () => {
    const result = productIdSchema.safeParse(inputValue);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setId(result.data);
      setSkip(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <a
          className="btn-secondary i-flex-row h-12 justify-center rounded-full underline"
          href="https://www.vinmonopolet.no/search/?q=:relevance&searchType=product"
          target="_blank"
          rel="noreferrer"
        >
          <LinkSimpleHorizontal size="1.75rem" />
          Gå til Vinmonopolet.no
        </a>
      </div>
      <div className="block-less-muted space-y-6 rounded-lg p-4">
        <div>
          <label htmlFor="vinmonopoletProductId" className="label">
            Varenummer/Link
          </label>
          <input
            className={`text-input text h-12 px-3 text-lg ${
              error ? "border-wine-500 bg-wine-25" : ""
            }`}
            type="text"
            name="vinmonopoletProductId"
            value={inputValue}
            autoComplete="off"
            placeholder="Varenummer"
            onKeyDown={handleKeyPressed}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {error && <em className="form-error">{error}</em>}
        </div>

        {!isWishlist && (
          <RadioGroup
            className="space-y-1"
            value={resetAction}
            onChange={setResetAction}
          >
            <RadioGroup.Label className="label">Velg verdier</RadioGroup.Label>
            {radioValues.map((radio) => (
              <RadioGroup.Option key={radio.value} value={radio.value}>
                {({ checked }) => (
                  <div
                    className={`btn-white rounded p-3 font-normal 
                ${
                  checked
                    ? "bg-blue-wine-500 active:bg-blue-wine-500 dark:bg-blue-wine-500 dark:hover:bg-blue-wine-500 border-blue-wine-500 dark:border-blue-wine-200 border text-slate-50"
                    : ""
                } flex cursor-pointer select-none flex-row items-center gap-x-2`}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{radio.title}</p>
                      <p className="text-sm font-normal opacity-60">
                        {radio.description}
                      </p>
                    </div>
                    {checked && (
                      <div className="rounded-full border-2 border-white p-0.5">
                        <Check size="1.2rem" weight="bold" />
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        )}

        <LoadingButton
          loadingText="Henter vin..."
          disabled={inputValue.length < 2}
          loading={status.isLoading}
          onClick={handleFetchWine}
          className="h-12 w-full justify-center rounded-full"
        >
          <DownloadSimple size="1.5rem" />
          Hent vin
        </LoadingButton>
      </div>
    </>
  );
};

export default Vinmonopolet;
