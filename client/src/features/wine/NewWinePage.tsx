import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../app/api";
import { FormModel } from "../../app/models/wine";
import WineForm from "./form/WineForm";

const NewWinePage = () => {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  const onSubmit = async (data: FormModel) => {
    try {
      console.log(data);
      const response = await api.Wine.addWine(data);
      console.log("adding wine response", response);
      navigate("/inventory");
    } catch (error: any) {
      console.error("Adding wine error", error);
      if (error) {
        setServerErrors(error);
      }
    }
  };

  return (
    <div>
      <WineForm
        title="Ny Vin"
        submitText="Legg til vin"
        onSubmit={onSubmit}
        serverErrors={serverErrors}
      />
    </div>
  );
};

export default NewWinePage;
