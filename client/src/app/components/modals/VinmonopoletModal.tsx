import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import Vinmonopolet from "../Vinmonopolet";
import Modal from "./Modal";
import { WineFormData } from "../../../features/wine/form/validationSchema";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  setValues: UseFormReset<WineFormData> | ((values: WineFormData) => void);
  productId?: string | null;
  isWishlist?: boolean;
  setValue?: UseFormSetValue<WineFormData>;
  getValues?: UseFormGetValues<WineFormData>;
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
      description="Fyll inn varenummer eller link fra Vinmonopolet"
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
