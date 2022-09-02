import { useEffect, useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import DetailList from "../../features/wine/details/components/DetailList";
import Modal from "./Modal";
import { WineFormData } from "../../features/wine/form/validationSchema";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  getValues: UseFormGetValues<WineFormData>;
}

const WineDetailsModal = ({ isOpen, setIsOpen, getValues }: Props) => {
  const [values, setValues] = useState<WineFormData>(getValues);

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
      <DetailList wine={values} />
    </Modal>
  );
};

export default WineDetailsModal;
