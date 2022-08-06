import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../app/layout/Title";
import CreateOrUpdate from "./form/CreateOrUpdate";
import { useAddWineMutation } from "../../app/services/wineApi";
import toast from "react-hot-toast";
import { WineFormData } from "./form/validationSchema";

const NewWinePage = () => {
  const navigate = useNavigate();
  const [addWine] = useAddWineMutation();
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  const onSubmit = async (data: WineFormData) => {
    await addWine(data)
      .unwrap()
      .then(() => {
        toast.success(`Opprettet ny vin!`, {
          position: "bottom-right",
        });
        navigate("/inventory");
      })
      .catch((err) => {
        // show server validation errors
        console.error("Adding wine error: ", err);
        if (err?.data?.errors) {
          setServerErrors(err.data.errors);
          console.log(err.data.errors);
          return;
        }
        console.error("Adding wine error", err);
      });
  };

  return (
    <div>
      <Title title="Ny Vin" border Icon={PlusCircle}>
        <p>
          Her kan du legge til vin. Trykk på &quot;Hent fra Vinmonopolet&quot;
          knappen for å hente vin fra Vinmonopolet.no.
        </p>
      </Title>
      <CreateOrUpdate onSubmit={onSubmit} serverErrors={serverErrors} />
    </div>
  );
};

export default NewWinePage;
