import { useCallback, useEffect, useState } from "react";
import ConsumedWine from "../../../features/wine/consumed/ConsumedWine";
import api from "../../api";
import { Consumed } from "../../models/consumed";
import DatePicker from "../DatePicker";
import ErrorBox from "../ErrorBox";
import { InfoBox } from "../InfoBox";
import Spinner from "../loading/Spinner";
import LoadingButton from "../LoadingButton";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  wineId: number;
  quantity: number;
}

const ConsumedModal = ({ isOpen, setIsOpen, wineId, quantity }: Props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Consumed[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  // fetch all dates to this wine
  const fetchConsumed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.Consumed.getConsumed(wineId);
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [wineId]);

  // fetch on load
  useEffect(() => {
    if (wineId && isOpen && !data) fetchConsumed();
  }, [wineId, isOpen, data, fetchConsumed]);

  // add consumed date
  const handleAddConsumed = async () => {
    if (!date || !wineId || !quantity) return;
    setError(null);
    setLoading(true);
    try {
      (await api.Consumed.addConsumed(wineId, date)) as Consumed[];
      // re-fetch dates
      await fetchConsumed();
      setDate(null);
    } catch (error: any) {
      console.error(error);
      setError(error?.data?.title || null);
    } finally {
      setLoading(false);
    }
  };

  // delete consumed date
  const handleDeleteConsumed = async (id: number) => {
    if (!wineId || !id || !data) return;
    setError(null);
    setLoading(true);
    try {
      await api.Consumed.deleteConsumed(id);
      // remove deleted date from state
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Drukket"
      description="Legger til en drukket dato på vinen og trekker fra antall -1."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div>
        {loading ? (
          <Spinner text="Laster datoer..." />
        ) : (
          <>
            {!quantity && (
              <InfoBox
                message="Du har ikke vinen på lager. Du kan ikke legge til
                  drukket-datoer når antall er 0."
              />
            )}
            {error && <ErrorBox message={error} />}

            {data && data.length > 0 ? (
              <div className="my-4 space-y-1 p-2 border rounded-lg ">
                {data.map((item) => (
                  <ConsumedWine
                    deleteConsumed={handleDeleteConsumed}
                    date={item.date}
                    id={item.id}
                    key={item.id}
                  />
                ))}
              </div>
            ) : (
              <InfoBox message="Ingen datoer er registrert enda." />
            )}

            <DatePicker
              text="Velg dato"
              value={date}
              onChange={setDate}
              hereafter={false}
              absolute={false}
            />
            <div className="grid mt-4 grid-cols-1 gap-2">
              <LoadingButton
                onClick={handleAddConsumed}
                loading={loading}
                disabled={!date || !quantity}
                loadingText="Legger til dato..."
                className="justify-center h-10 rounded-full"
              >
                Legg til dato
              </LoadingButton>
              <button
                className="btn-white h-10 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Tilbake
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ConsumedModal;
