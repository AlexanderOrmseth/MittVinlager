import { UserMinus } from "phosphor-react";
import { useState } from "react";
import { resetAll } from "../../../features/wine/wineSlice";
import { useAppDispatch } from "../../store/configureStore";
import LoadingButton from "../LoadingButton";
import Modal from "./Modal";
import { useDeleteUserMutation } from "../../services/authApi";
import { signOut } from "../../../features/account/accountSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const DeleteUserModal = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (value !== "SLETTMEG") return;

    await deleteUser()
      .unwrap()
      .then(() => {
        dispatch(resetAll());
        dispatch(signOut());
        // close modal
        setIsOpen(false);
        toast.success("Brukeren og all data ble slettet.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error ved sletting av bruker.");
      });
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
          <mark className="dark:bg-gray-950 dark:text-wine-200 rounded-full bg-slate-100 p-1 px-2 font-medium">
            SLETTMEG
          </mark>{" "}
          med store bokstaver for å bekrefte sletting av bruker.
        </p>

        <div className="block-less-muted mt-4  space-y-6 rounded-lg p-4">
          <div>
            <label className="label">Bekreft sletting</label>
            <input
              placeholder="SLETTMEG"
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-input h-12"
              type="text"
            />
          </div>

          <LoadingButton
            onClick={handleDeleteUser}
            loading={isLoading}
            disabled={value !== "SLETTMEG"}
            loadingText="Sletter bruker..."
            className="h-12 w-full justify-center rounded-full"
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
