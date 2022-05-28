import { UseFormReset } from "react-hook-form";
import Vinmonopolet from "../../../features/wine/form/Vinmonopolet";
import { FormModel } from "../../models/wine";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  handleResetForm: UseFormReset<FormModel>;
}

const VinmonopoletModal = ({ isOpen, setIsOpen, handleResetForm }: Props) => {
  return (
    <Modal
      title="Hent vin fra Vinmonopolet"
      description="Fyll inn productnummer eller url fra vinmonopolet"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      xl
    >
      <div>
        <Vinmonopolet setIsOpen={setIsOpen} handleResetForm={handleResetForm} />
      </div>
    </Modal>
  );
};

export default VinmonopoletModal;
