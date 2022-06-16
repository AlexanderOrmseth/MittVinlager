import { useCallback, useEffect, useState } from "react";
import ConsumedWine from "../../../features/wine/consumed/ConsumedWine";
import { decrementQuantity } from "../../../features/wine/slices/wineSlice";
import api from "../../api";
import { Consumed } from "../../models/consumed";
import { useAppDispatch } from "../../store/configureStore";
import AsideDisclosure from "../AsideDisclosure";
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
  const dispatch = useAppDispatch();
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
    } catch (error: any) {
      console.error(error);
      setError(error?.data?.title || "Error, kunne ikke laste drukket-datoer.");
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

      // remove 1 from quantity
      dispatch(decrementQuantity({ id: wineId, quantity }));

      setDate(null);
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
      setError(error?.data?.title || "Error, kunne ikke legge til dato.");
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
    } catch (error: any) {
      console.error(error);
      setError(error?.data?.title || "Error, kunne ikke slette dato.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Drukket"
      description='Her kan du legge til "drukket-datoer" som lagres på vinen.'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div>
        {loading ? (
          <Spinner text="Laster datoer..." />
        ) : (
          <>
            <AsideDisclosure text="Hvordan fungerer dette?" defaultOpen={false}>
              <div className="space-y-2">
                <p className="text-gray-700">
                  En vin kan max ha 10 drukket-datoer, den eldste datoen vil bli
                  <span className="font-bold"> overskrevet</span> automatisk.
                  Når du legger til en drukket dato vil vinens antall{" "}
                  <span className="font-bold">reduseres</span> med 1. Du kan
                  ikke registrere drukket datoer på vin du ikke har på lager,
                  altså hvor antall er lik 0.
                </p>
                <p className="text-gray-700">
                  På profilsiden kan du se de 10 siste drukket-datoene fra alle
                  vin, mens på denne siden vises kun drukket-datoer som hører
                  til valgt vin.
                </p>
              </div>
            </AsideDisclosure>

            {!quantity && (
              <InfoBox
                message="Du har ikke vinen på lager. Du kan ikke legge til
                  drukket-datoer når antall er 0."
              />
            )}

            {error && <ErrorBox message={error} />}

            {data && data.length > 0 ? (
              <div className="my-4 p-2 border rounded-lg ">
                <h3 className="mb-0.5 text-center border-b pb-2 font-medium text-sm">
                  Drukket
                </h3>
                <ul className="space-y-1 ">
                  {data.map((item) => (
                    <ConsumedWine
                      deleteConsumed={handleDeleteConsumed}
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
