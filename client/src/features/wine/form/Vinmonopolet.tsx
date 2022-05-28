import { Link as LinkIcon, DownloadSimple } from "phosphor-react";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import api from "../../../app/api";
import LoadingButton from "../../../app/components/LoadingButton";
import { FormModel } from "../../../app/models/wine";

interface Props {
  handleResetForm: UseFormReset<FormModel>;
  productId?: string | null;
  name?: string;
  setIsOpen: (value: boolean) => void;
}

const Vinmonopolet = ({ handleResetForm, productId, setIsOpen }: Props) => {
  const [value, setValue] = useState<string>(productId || "11395502");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchWine = async () => {
    setLoading(true);
    try {
      const res = (await api.Vinmonopolet.getWineByProductId(
        value
      )) as FormModel;
      handleResetForm(res);
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
      setError(error.data.title);
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
      <div className="p-4 bg-slate-50 rounded-lg">
        <label htmlFor="vinmonopoletProductId" className="label">
          Hent vin fra Vinmonopolet
        </label>
        <div className="flex flex-row gap-2 items-center">
          <input
            className={`text-input text ${
              error ? "border-wine-500 bg-wine-25" : ""
            }`}
            type="text"
            name="vinmonopoletProductId"
            value={value}
            autoComplete="off"
            placeholder="produktnummer/url"
            onChange={(e) => setValue(e.target.value)}
          />
          <LoadingButton
            loadingText="Henter vin..."
            disabled={value.length < 1}
            loading={loading}
            onClick={handleFetchWine}
            className="h-12"
          >
            <DownloadSimple size="1.5rem" />
            Hent vin
          </LoadingButton>
        </div>
        {error && <p className="text-wine-500 text-sm italic">{error}</p>}
      </div>
    </>
  );
};

export default Vinmonopolet;
