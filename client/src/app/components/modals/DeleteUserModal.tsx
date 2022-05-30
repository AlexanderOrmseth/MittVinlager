import { UserMinus } from "phosphor-react";
import { useState } from "react";
import { deleteUser } from "../../../features/account/accountSlice";
import { resetAll } from "../../../features/wine/slices/wineSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import LoadingButton from "../LoadingButton";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const DeleteUserModal = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const { status } = useAppSelector((state) => state.account);

  const handleDeleteUser = async () => {
    await dispatch(deleteUser());
    dispatch(resetAll());
    // close modal
    setIsOpen(false);
  };

  return (
    <Modal
      title="Slett bruker"
      description="Brukeren, all vin og bilder slettes permanent."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div>
        <p>
          Skriv{" "}
          <span className="p-1 px-2 bg-slate-100 font-medium rounded-full">
            SLETTMEG
          </span>{" "}
          med store bokstaver for å bekrefte sletting av bruker.
        </p>
        <input
          placeholder="SLETTMEG"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-input my-4"
          type="text"
        />
        <div className="grid grid-cols-1 gap-2">
          <LoadingButton
            onClick={handleDeleteUser}
            loading={status === "loading"}
            disabled={value !== "SLETTMEG"}
            loadingText="Sletter bruker..."
            className="justify-center h-10 rounded-full"
          >
            <UserMinus size="1.3rem" />
            Slett meg
          </LoadingButton>
          <button
            className="btn-white h-10 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            Tilbake
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
