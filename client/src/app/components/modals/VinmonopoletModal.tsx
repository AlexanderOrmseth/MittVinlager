import {UseFormGetValues, UseFormReset, UseFormSetValue} from "react-hook-form";
import Vinmonopolet from "../Vinmonopolet";
import {FormModel} from "../../models/wine";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  setValues: UseFormReset<FormModel> | ((values: FormModel) => void);
  productId?: string | null;
  isWishlist?: boolean;
  setValue?: UseFormSetValue<FormModel>;
  getValues?: UseFormGetValues<FormModel>;
}

const VinmonopoletModal = ({
  isOpen,
  setIsOpen,
  setValues,
  setValue,
  getValues,
  productId,
  isWishlist = false,
}: Props) => {
  return (
    <Modal
      title="Hent vin fra Vinmonopolet"
      description="Fyll inn produktId eller url fra vinmonopolet"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      xl
    >
      <Vinmonopolet
        setIsOpen={setIsOpen}
        setValue={setValue}
        getValues={getValues}
        productId={productId}
        isWishlist={isWishlist}
        setValues={setValues}
      />
    </Modal>
  );
};

export default VinmonopoletModal;
