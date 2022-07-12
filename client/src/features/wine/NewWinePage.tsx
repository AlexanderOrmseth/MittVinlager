import { PlusCircle } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../app/layout/Title";
import { FormModel } from "../../app/models/wine";
import CreateOrUpdate from "./form/CreateOrUpdate";
import { useAddWineMutation } from "../api/apiSlice";

const NewWinePage = () => {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  const [addWine, { isLoading, error, isSuccess, isError }] =
    useAddWineMutation();

  const onSubmit = async (data: FormModel) => {
    console.log(data);
    await addWine(data)
      .unwrap()
      .then((res) => {
        console.log("adding wine response", res);
        navigate("/inventory");
      })
      .catch((err) => {
        console.error("Adding wine error", err);
        if (err) {
          setServerErrors(err);
        }
      });
  };

  return (
    <div>
      <Title title="Ny Vin" border Icon={PlusCircle}>
        <p>
          Her kan du legge til vin. Trykk på "Hent fra Vinmonopolet" knappen for
          å hente vin fra Vinmonopolet.no.
        </p>
      </Title>
      <CreateOrUpdate onSubmit={onSubmit} serverErrors={serverErrors} />
    </div>
  );
};

export default NewWinePage;
