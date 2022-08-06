import { Trash } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../LoadingButton";
import Modal from "./Modal";
import { useDeleteWineMutation } from "../../services/wineApi";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  wineToDelete: { id: number | null | undefined; name: string | null };
  shouldNavigate?: boolean;
}

const DeleteWineModal = ({
  isOpen,
  setIsOpen,
  wineToDelete,
  shouldNavigate,
}: Props) => {
  const navigate = useNavigate();
  const [deleteWine, { isLoading}] =
    useDeleteWineMutation();

  const handleDeleteWine = async () => {
    if (wineToDelete.id) {
      // delete wine
      await deleteWine(wineToDelete.id);

      // close modal and navigate if needed
      setIsOpen(false);
      if (shouldNavigate) navigate("/inventory");
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
          loading={isLoading}
          disabled={!wineToDelete.id || isLoading}
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
