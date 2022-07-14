import { PencilSimpleLine } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../app/components/loading/Spinner";
import Title from "../../app/layout/Title";
import { FormModel } from "../../app/models/wine";
import CreateOrUpdate from "./form/CreateOrUpdate";
import { useUpdateWineMutation } from "../api/apiSlice";
import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";
import toast from "react-hot-toast";
import NotFound from "../../app/layout/NotFound";
import ErrorBox from "../../app/components/ErrorBox";

const UpdateWinePage = () => {
  const navigate = useNavigate();
  const { wine, id, status: wineStatus } = useFetchSingleWine();
  const [updateWine] = useUpdateWineMutation();

  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  // handle id, loading, fetch error
  if (!id) return <NotFound />;
  else if (wineStatus.isLoading) return <Spinner text="Laster..." />;
  else if (wineStatus.isError) {
    return <ErrorBox message={`Kunne ikke finne vinen med id: ${id}`} />;
  }

  const onSubmit = async (data: FormModel) => {
    if (!id) {
      console.log("Id was undefined or null");
      return;
    }
    await updateWine({ id, data })
      .unwrap()
      .then(() => {
        toast.success(`Oppdaterte vin!`, {
          position: "bottom-right",
        });
        navigate("/inventory");
      })
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
