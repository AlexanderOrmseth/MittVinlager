import { useState } from "react";
import ConsumedWine from "../../../features/wine/details/ConsumedWine";
import AsideDisclosure from "../AsideDisclosure";
import DatePicker from "../DatePicker";
import ErrorBox from "../ErrorBox";
import { InfoBox } from "../InfoBox";
import Spinner from "../loading/Spinner";
import LoadingButton from "../LoadingButton";
import Modal from "./Modal";
import {
  useAddConsumedDateMutation,
  useDeleteConsumedDateByIdMutation,
  useGetConsumedDatesByWineIdQuery,
} from "../../services/wineConsumedApi";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  wineId: number;
  quantity: number;
}

const ConsumedModal = ({ isOpen, setIsOpen, wineId, quantity }: Props) => {
  const { data, isLoading } = useGetConsumedDatesByWineIdQuery(wineId);
  const [addDate, addDateStatus] = useAddConsumedDateMutation();
  const [deleteDate] = useDeleteConsumedDateByIdMutation();
  const [error, setError] = useState<string | null | undefined>(null);
  const [date, setDate] = useState<Date | null>(null);

  const handleAddDate = async () => {
    if (!date || !wineId || !quantity) return;

    await addDate({ id: wineId, data: date })
      .unwrap()
      .then(() => {
        setDate(null);
        setIsOpen(false);
      })
      .catch((error) => {
        if ("data" in error) {
          setError(error.data.title || "Error! Kunne ikke legge til dato.");
        }
        console.error("rejected", error);
      });
  };

  const handleDeleteDate = async (id: number) => {
    if (!wineId || !id || !data) return;

    await deleteDate(id)
      .unwrap()
      .then(() => setDate(null))
      .catch((error) => {
        if ("data" in error) {
          setError(error.data.title || "Error! Kunne ikke legge til dato.");
        }
        console.error("rejected", error);
      });
  };

  return (
    <Modal
      title="Drukket"
      description='Her kan du legge til "drukket-datoer" som lagres på vinen.'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div>
        {isLoading ? (
          <Spinner text="Laster datoer..." />
        ) : (
          <>
            <AsideDisclosure
              title="Hvordan fungerer dette?"
              defaultOpen={false}
            >
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  En vin kan max ha 10 drukket-datoer, den eldste datoen vil bli
                  <span className="font-bold"> overskrevet</span> automatisk.
                  Når du legger til en drukket dato vil vinens antall{" "}
                  <span className="font-bold">reduseres</span> med 1. Du kan
                  ikke registrere drukket datoer på vin du ikke har på lager,
                  altså hvor antall er lik 0.
                </p>
                <p>
                  På profilsiden kan du se de 10 siste drukket-datoene fra alle
                  vin, mens på denne siden vises kun drukket-datoer som hører
                  til valgt vin.
                </p>
              </div>
            </AsideDisclosure>

            {error && <ErrorBox message={error} />}

            {data && data.length > 0 ? (
              <div className="block-muted my-4 rounded-lg p-2">
                <h3 className="mb-2 border-b pb-2 text-center text-sm font-medium dark:border-gray-700">
                  Drukket
                </h3>
                <ul className="space-y-1">
                  {data.map((item) => (
                    <ConsumedWine
                      deleteDate={handleDeleteDate}
                      date={item.date}
                      id={item.id}
                      key={item.id}
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <InfoBox message="Ingen datoer er registrert enda." />
            )}

            {!quantity && <InfoBox message="Du har ikke vinen på lager." />}

            <div className="block-less-muted mt-4 space-y-6 rounded-lg p-4">
              <div>
                <label className="label">Velg dato</label>
                <DatePicker
                  text="Velg dato"
                  value={date}
                  onChange={setDate}
                  hereafter={false}
                  absolute={false}
                />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2">
                <LoadingButton
                  onClick={handleAddDate}
                  loading={isLoading || addDateStatus.isLoading}
                  disabled={!date || !quantity}
                  loadingText="Legger til dato..."
                  className="h-12 justify-center rounded-full"
                >
                  Legg til dato
                </LoadingButton>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ConsumedModal;
