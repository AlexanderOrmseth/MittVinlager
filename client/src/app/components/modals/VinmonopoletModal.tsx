import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import Vinmonopolet from "../../../features/wine/form/Vinmonopolet";
import { FormModel } from "../../models/wine";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  productId?: string | null;
  setIsOpen: (val: boolean) => void;
  handleResetForm: UseFormReset<FormModel>;
  setValue: UseFormSetValue<FormModel>;
  getValues: UseFormGetValues<FormModel>;
}

const VinmonopoletModal = ({
  isOpen,
  setIsOpen,
  handleResetForm,
  setValue,
  getValues,
  productId,
}: Props) => {
  return (
    <Modal
      title="Hent vin fra Vinmonopolet"
      description="Fyll inn produktId eller url fra vinmonopolet"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      xl
    >
      <div>
        <Vinmonopolet
          setIsOpen={setIsOpen}
          setValue={setValue}
          getValues={getValues}
          productId={productId}
          handleResetForm={handleResetForm}
        />
      </div>
    </Modal>
  );
};

export default VinmonopoletModal;
