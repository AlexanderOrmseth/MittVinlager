import { RadioGroup } from "@headlessui/react";
import { Check, DownloadSimple, Link as LinkIcon } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import LoadingButton from "./LoadingButton";
import { useGetVinmonopoletWineQuery } from "../services/vinmonopoletApi";
import { WineFormData } from "../../features/wine/form/validationSchema";

interface Props {
  setIsOpen: (value: boolean) => void;
  productId?: string | null;

  setValues: UseFormReset<WineFormData> | ((values: WineFormData) => void);
  isWishlist: boolean;

  setValue?: UseFormSetValue<WineFormData>;
  getValues?: UseFormGetValues<WineFormData>;
}

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

  const handleSetValues = useCallback(
    (data: WineFormData) => {
      if (isWishlist) {
        setValues(data);
      } else if (setValue && getValues) {
        switch (resetAction) {
          case 1:
            // reset entire form
            setValues(data);
            break;
          case 2:
            // replace price

            setValue("price", data.price);
            break;
          case 3:
            // reset everything but except userDetails
            const { userDetails, ...rest } = data;
            setValues({ ...rest, userDetails: getValues("userDetails") });
            break;
          default:
            // reset entire form
            setValues(data);
            break;
        }
      }
    },
    [getValues, isWishlist, resetAction, setValue, setValues]
  );

  useEffect(() => {
    if (data) {
      // transform response to satisfy formData
      const _data: WineFormData = {
        ...data,
        file: null,
        resetImage: false,
        userDetails: { ...data.userDetails, purchaseDate: null },
      };

      handleSetValues(_data);
      console.log(data);
      setSkip(true);
      setIsOpen(false);
    }
  }, [data, handleSetValues, setIsOpen]);

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === "Enter") {
      handleFetchWine();
    }
  };

  const isValidProductId = (val?: string): boolean =>
    val ? /^\d+$/.test(val) : false;

  const handleFetchWine = async () => {
    let productId = inputValue.trim();

    // if its a link
    if (
      productId.includes("https://www.vinmonopolet.no/") &&
      productId.includes("/p/")
    ) {
      productId = productId.split("/p/")[1];
    }

    // validate product id
    if (!isValidProductId(productId)) {
      setError("Error, kunne ikke hente vin med denne produktId'en.");
      return;
    }

    // trigger fetch
    setId(productId);
    setSkip(false);
  };

  return (
    <>
      <div className="mb-4">
        <a
          className="inline-flex link flex-row gap-x-1.5 items-center text-sm bg-green-wine-25 hover:bg-green-wine-100 dark:bg-gray-950 p-2 rounded"
          href="https://www.vinmonopolet.no/search/?q=:relevance&searchType=product"
          target="_blank"
          rel="noreferrer"
        >
          <LinkIcon size="1.2rem" />
          Gå til Vinmonopolet.no
        </a>
      </div>
      <div className="p-4 space-y-6 block-less-muted rounded-lg">
        <div>
          <label htmlFor="vinmonopoletProductId" className="label">
            ProduktId/Link
          </label>
          <input
            className={`text-input text h-12 px-3 text-lg ${
              error ? "border-wine-500 bg-wine-25" : ""
            }`}
            type="text"
            name="vinmonopoletProductId"
            value={inputValue}
            autoComplete="off"
            placeholder="produktId"
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
                    className={`p-3 btn-white rounded font-normal 
                ${
                  checked
                    ? "bg-blue-wine-500 active:bg-blue-wine-500 dark:bg-blue-wine-500 dark:hover:bg-blue-wine-500 text-slate-50 border border-blue-wine-500 dark:border-blue-wine-200"
                    : ""
                } flex flex-row gap-x-2 items-center cursor-pointer select-none`}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{radio.title}</p>
                      <p className="opacity-60 font-normal text-sm">
                        {radio.description}
                      </p>
                    </div>
                    {checked && (
                      <div className="border-2 border-white rounded-full p-0.5">
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
          disabled={inputValue.length < 1}
          loading={status.isLoading}
          onClick={handleFetchWine}
          className="h-12 w-full rounded-full justify-center"
        >
          <DownloadSimple size="1.5rem" />
          Hent vin
        </LoadingButton>
      </div>
    </>
  );
};

export default Vinmonopolet;
