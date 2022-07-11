import { RadioGroup } from "@headlessui/react";
import { Link as LinkIcon, DownloadSimple, Check } from "phosphor-react";
import { useState } from "react";
import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import api from "../api/api";
import LoadingButton from "./LoadingButton";
import { FormModel } from "../models/wine";

interface Props {
  setIsOpen: (value: boolean) => void;
  productId?: string | null;

  setValues: UseFormReset<FormModel> | ((values: FormModel) => void);
  isWishlist: boolean;

  setValue?: UseFormSetValue<FormModel>;
  getValues?: UseFormGetValues<FormModel>;
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
  const [inputValue, setInputValue] = useState<string>(productId || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetAction, setResetAction] = useState(1);

  const isValidProductId = (val?: string): boolean =>
    val ? /^\d+$/.test(val) : false;

  const handleFetchWine = async () => {
    try {
      let productId = inputValue.trim();
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

      setLoading(true);

      const res = (await api.Vinmonopolet.getWineByProductId(
        productId
      )) as FormModel;

      if (isWishlist) {
        setValues(res);
      } else if (setValue && getValues) {
        switch (resetAction) {
          case 1:
            // reset entire form
            setValues(res);
            break;
          case 2:
            // replace price
            setValue("price", res.price);
            break;
          case 3:
            // reset everything but except userDetails
            const { userDetails, ...rest } = res;
            setValues({ ...rest, userDetails: getValues("userDetails") });
            break;
          default:
            // reset entire form
            setValues(res);
            break;
        }
      }

      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
      setError(
        error?.data?.title ||
          "Error, kunne ikke hente vin med denne produktId'en"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <a
          className="inline-flex flex-row gap-x-1.5 items-center text-green-wine-500 font-medium px-2 text-sm bg-green-wine-25 hover:bg-green-wine-100 py-2 rounded hover:underline"
          href="https://www.vinmonopolet.no/search/?q=:relevance&searchType=product"
          target="_blank"
          rel="noreferrer"
        >
          <LinkIcon size="1.2rem" />
          Gå til Vinmonopolet.no
        </a>
        <div className="flex flex-row gap-2 my-4 text-slate-600 font-mono">
          <span>9574701</span>
          <span>9524805</span>
          <span>9680901</span>
        </div>
      </div>
      <div className="p-4 bg-slate-50 space-y-6 dark:bg-gray-800/30 dark:border dark:border-gray-700 rounded-lg">
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
            onChange={(e) => setInputValue(e.target.value)}
          />
          {error && <p className="text-wine-500 text-sm italic">{error}</p>}
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
                {({ checked, active }) => (
                  <div
                    className={`p-3 rounded 
                ${
                  checked
                    ? "bg-blue-wine-500 text-slate-50"
                    : "bg-slate-200 text-gray-900 hover:bg-slate-300"
                } flex flex-row gap-x-2 items-center cursor-pointer select-none`}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{radio.title}</p>
                      <p className="opacity-80 text-sm">{radio.description}</p>
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
          loading={loading}
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
