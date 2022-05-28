import { useEffect, useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import WineDetails from "../../../features/wine/details/WineDetails";
import { FormModel, WineBaseModel } from "../../models/wine";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  getValues: UseFormGetValues<FormModel>;
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
      <div>
        <WineDetails wine={values} />
        <button
          className="btn-white my-4 h-10"
          onClick={() => setIsOpen(false)}
        >
          Tilbake
        </button>
      </div>
    </Modal>
  );
};

export default WineDetailsModal;
