import { useEffect, useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import WineDetail from "../../../features/wine/details/WineDetail";
import { WineBaseModel } from "../../models/wine";
import Modal from "./Modal";
import { WineFormData } from "../../../features/wine/form/validationSchema";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  getValues: UseFormGetValues<WineFormData>;
}

const WineDetailsModal = ({ isOpen, setIsOpen, getValues }: Props) => {
  const [values, setValues] = useState<WineBaseModel>(getValues);

  useEffect(() => {
    if (!isOpen) return;
    setValues(getValues());
    console.log("Update values");
  }, [getValues, isOpen]);

  if (!values) return null;

  return (
    <Modal
      title="Forhåndsvisning av vin"
      description={values?.name}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      xl
    >
      <WineDetail wine={values} />
    </Modal>
  );
};

export default WineDetailsModal;
