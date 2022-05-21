import { ArrowLeft, DownloadSimple } from "phosphor-react";
import { useState } from "react";
import api from "../../../app/api";
import LoadingButton from "../../../app/components/LoadingButton";
import { FormModel } from "../../../app/models/wine";

interface Props {
  handleResetForm: (values: FormModel) => void;
  productId?: string | null;
  name?: string;
}

const Vinmonopolet = ({ handleResetForm, productId, name }: Props) => {
  const [value, setValue] = useState<string>(productId || "11395502");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nameOfFetched, setNameOfFetched] = useState<string | null>(
    name || null
  );

  const handleFetchWine = async () => {
    setLoading(true);
    try {
      const res = (await api.Vinmonopolet.getWineByProductId(
        value
      )) as FormModel;
      handleResetForm(res);
      setNameOfFetched(res.name);
      console.log("Vinmonopolet Response: ", res);
    } catch (error: any) {
      console.error(error);
      setError(error.data.title);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {nameOfFetched ? (
        <div className="flex flex-row gap-4 items-end">
          <p className="flex-1">
            Hentet:{" "}
            <a
              href={`https://www.vinmonopolet.no/Land/Norge/Barekstens-Gin-Fatlagret/p/${value}`}
              target="_blank"
              className="font-medium text-success-500 border-b border-success-500"
              rel="noreferrer"
            >
              {nameOfFetched}
            </a>
          </p>
          <button
            className="rounded border transition-all cursor-pointer px-4 text-center font-medium text-sm bg-white 
            focus:border-transparent focus:bg-white focus:ring-4 focus:ring-wine-300 focus:ring-opacity-50 outline-none 
            hover:bg-slate-50 active:bg-slate-100 active:text-gray-700 inline-flex flex-row gap-2 h-10 items-center"
            onClick={() => [setNameOfFetched(null), setValue("")]}
          >
            <ArrowLeft size="1.2rem" />
            Hent en annen
          </button>
        </div>
      ) : (
        <div>
          <label htmlFor="vinmonopoletProductId" className="label">
            Hent vin fra Vinmonopolet
          </label>
          <div className="flex flex-row gap-2 items-center">
            <input
              className={`text-input text ${error ? "border-wine-500" : ""}`}
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
            >
              <DownloadSimple size="1.5rem" />
              Hent vin
            </LoadingButton>
          </div>
          {error && <p className="text-wine-500 text-sm italic">{error}</p>}
        </div>
      )}
    </>
  );
};

export default Vinmonopolet;
