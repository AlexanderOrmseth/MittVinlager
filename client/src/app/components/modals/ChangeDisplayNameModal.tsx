import React, { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../../store/configureStore";
import { useChangeDisplayNameMutation } from "../../services/authApi";
import { setDisplayName } from "../../../features/account/accountSlice";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import LoadingButton from "../LoadingButton";
import { FloppyDisk } from "phosphor-react";
import { z } from "zod";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const NameValidationSchema = z
  .string()
  .trim()
  .min(2, "Visningsnavn må være minst 2 bokstaver.")
  .max(15, "Visningsnavn kan max være 15 bokstaver.")
  .regex(
    /^[a-zA-Z\u00C0-\u00ff]+$/,
    "Visningsnavn kan kun inneholde bokstaver fra A-Å."
  );

const ChangeDisplayNameModal: FunctionComponent<Props> = ({
  isOpen,
  setIsOpen,
}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [changeDisplayName, { ...changeDisplayNameStatus }] =
    useChangeDisplayNameMutation();

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === "Enter") {
      handleDeleteUser();
    }
  };

  const handleDeleteUser = async () => {
    // validate displayName
    const displayName = value.trim();
    try {
      NameValidationSchema.parse(displayName);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrorMessage(err.issues[0].message);
      }
      return;
    }

    await changeDisplayName({ displayName: displayName })
      .unwrap()
      .then(() => {
        // set displayName
        dispatch(setDisplayName(displayName));
        // close modal
        setIsOpen(false);
        toast.success("Ditt visningsnavn er endret.");
        // reset
        setValue("");
        setErrorMessage(undefined);
      })
      .catch((err) => {
        if (err?.data?.title) {
          toast.error(err.data.title);
          setErrorMessage(err.data.title);
          return;
        }

        console.log(err);
        toast.error("Error, kunne ikke endre visningsnavn.");
      });
  };

  return (
    <Modal
      title="Endre navn"
      description="Her kan du endre visningsnavn på din bruker."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      xl
    >
      <div>
        <p>Visningsnavn kan ikke inneholde tegn eller symboler</p>
        <pre className="text-xs font-medium text-red-700">
          {JSON.stringify(changeDisplayNameStatus.error, null, 4)}
        </pre>
        <div className="p-4 mt-4  space-y-6 block-less-muted rounded-lg">
          <div>
            <label className="label">Nytt visningsnavn</label>
            <input
              onKeyDown={handleKeyPressed}
              placeholder="Nytt visningsnavn"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-input h-12"
              type="text"
            />
            <em className="form-error">{errorMessage}</em>
          </div>
          <LoadingButton
            onClick={handleDeleteUser}
            loading={changeDisplayNameStatus.isLoading}
            disabled={value.trim().length < 2}
            loadingText="Endrer navn..."
            className="justify-center h-12 w-full rounded-full"
          >
            <FloppyDisk size="1.3rem" />
            Lagre endring
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeDisplayNameModal;
