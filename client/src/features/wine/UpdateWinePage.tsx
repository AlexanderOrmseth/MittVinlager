import { PencilSimpleLine } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../app/components/loading/Spinner";
import Title from "../../app/layout/Title";
import { FormModel } from "../../app/models/wine";
import CreateOrUpdate from "./form/CreateOrUpdate";
import { useUpdateWineMutation } from "../api/apiSlice";
import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";

const UpdateWinePage = () => {
  const navigate = useNavigate();
  const { wine, id, status: wineStatus } = useFetchSingleWine();

  const [updateWine] = useUpdateWineMutation();

  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  if (wineStatus.isLoading) return <Spinner text="Laster vin..." />;
  else if (wineStatus.isError) return <div>vinen eksisterer ikke!</div>;

  const onSubmit = async (data: FormModel) => {
    if (!id) {
      console.log("Id was undefined or null");
      return;
    }
    await updateWine({ id, data })
      .unwrap()
      .then(() => navigate("/inventory"))
      .catch((err) => {
        // show server validation errors
        if (err?.data?.errors) {
          setServerErrors(err.data.errors);
          return;
        }
        console.error("Update wine error", err);
      });
  };

  return (
    <div>
      <Title title="Rediger Vin" border Icon={PencilSimpleLine}>
        <p>
          Her kan du legge til vin. Trykk på "Hent fra Vinmonopolet" knappen for
          å hente vin fra Vinmonopolet.no.
        </p>
      </Title>
      {wineStatus.isSuccess && (
        <CreateOrUpdate
          onSubmit={onSubmit}
          wine={wine}
          serverErrors={serverErrors}
        />
      )}
    </div>
  );
};

export default UpdateWinePage;
