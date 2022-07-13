import { UserMinus } from "phosphor-react";
import { useState } from "react";
import { deleteUser } from "../../../features/account/accountSlice";
import { resetAll } from "../../../features/wine/wineSlice";
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
          <mark className="p-1 px-2 bg-slate-100 dark:bg-gray-950 dark:text-wine-200 font-medium rounded-full">
            SLETTMEG
          </mark>{" "}
          med store bokstaver for å bekrefte sletting av bruker.
        </p>

        <div className="p-4 mt-4  space-y-6 block-less-muted rounded-lg">
          <div>
            <label className="label">Bekreft sletting</label>
            <input
              placeholder="SLETTMEG"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-input h-12"
              type="text"
            />
          </div>

          <LoadingButton
            onClick={handleDeleteUser}
            loading={status === "loading"}
            disabled={value !== "SLETTMEG"}
            loadingText="Sletter bruker..."
            className="justify-center h-12 w-full rounded-full"
          >
            <UserMinus size="1.3rem" />
            Slett meg
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
