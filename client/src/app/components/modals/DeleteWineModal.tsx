import { Trash } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { triggerFetch } from "../../../features/wine/slices/wineSlice";
import api from "../../api";
import { useAppDispatch } from "../../store/configureStore";
import LoadingButton from "../LoadingButton";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  wineToDelete: { id: number | null; name: string | null };
  shouldNavigate?: boolean;
}

const DeleteWineModal = ({
  isOpen,
  setIsOpen,
  wineToDelete,
  shouldNavigate,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteWine = async () => {
    if (wineToDelete.id) {
      try {
        setLoading(true);
        await api.Wine.deleteWine(wineToDelete.id);
        dispatch(triggerFetch());

        // close modal
        setIsOpen(false);

        // navigate
        if (shouldNavigate) navigate("/inventory");
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      title="Slett vin"
      description={`Vil du slette ${wineToDelete.name}`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="grid grid-cols-1 gap-2">
        <LoadingButton
          onClick={handleDeleteWine}
          loading={loading}
          disabled={!wineToDelete.id}
          loadingText="Sletter vin..."
          className="justify-center h-10 rounded-full"
        >
          <Trash size="1.3rem" />
          Slett vin
        </LoadingButton>
      </div>
    </Modal>
  );
};

export default DeleteWineModal;
