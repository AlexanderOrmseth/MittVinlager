import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../../app/layout/Title";
import AddOrEdit from "../form/AddOrEdit";
import { useAddWineMutation } from "../../../app/services/wineApi";
import toast from "react-hot-toast";
import { WineFormData } from "../form/validationSchema";

const AddWinePage = () => {
  const navigate = useNavigate();
  const [addWine] = useAddWineMutation();
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  const onSubmit = async (data: WineFormData) => {
    // debug
    console.log(data);

    await addWine(data)
      .unwrap()
      .then(() => {
        toast.success("Opprettet ny vin!");
        navigate("/inventory");
      })
      .catch((err) => {
        // show server validation errors
        console.error("Adding wine error: ", err);
        if (err?.data?.errors) {
          setServerErrors(err.data.errors);
        }
      });
  };

  return (
    <div>
      <Title title="Ny Vin" border Icon={PlusCircle}>
        <p>
          Her kan du legge til vin. Trykk på
          <strong className="mx-1">Hent fra Vinmonopolet</strong>for å hente
          vininformasjon fra Vinmonopolet.
        </p>
      </Title>
      <AddOrEdit onSubmit={onSubmit} serverErrors={serverErrors} />
    </div>
  );
};

export default AddWinePage;
