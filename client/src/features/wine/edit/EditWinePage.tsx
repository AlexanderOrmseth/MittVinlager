import { PencilSimpleLine } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../app/components/Spinner";
import Title from "../../../app/layout/Title";
import AddOrEdit from "../form/AddOrEdit";
import { useUpdateWineMutation } from "../../../app/services/wineApi";
import useFetchSingleWine from "../../../app/hooks/useFetchSingleWine";
import toast from "react-hot-toast";
import NotFound from "../../../app/layout/NotFound";
import ErrorBox from "../../../app/components/ErrorBox";
import DeleteWineModal from "../../../app/modals/DeleteWineModal";
import { WineFormData } from "../form/validationSchema";

const EditWinePage = () => {
  const navigate = useNavigate();
  const { wine, id, status: wineStatus } = useFetchSingleWine();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
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

  const onSubmit = async (data: WineFormData) => {
    // debug
    console.log(data);

    await updateWine({ id, data })
      .unwrap()
      .then(() => {
        toast.success("Oppdaterte vin!");
        navigate(-1);
      })
      .catch((err) => {
        // show server validation errors
        console.error("Update wine error", err);
        if (err?.data?.errors) {
          setServerErrors(err.data.errors);
        }
      });
  };

  return (
    <div>
      <Title title="Rediger Vin" border Icon={PencilSimpleLine}>
        <p>
          Trykk på<strong className="mx-1">Hent fra Vinmonopolet</strong>for å
          hente vininformasjon fra Vinmonopolet.
        </p>
      </Title>
      {wineStatus.isSuccess && wine && (
        <>
          <AddOrEdit
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            onSubmit={onSubmit}
            wine={wine}
            serverErrors={serverErrors}
          />

          <DeleteWineModal
            isOpen={deleteModalIsOpen}
            shouldNavigate={true}
            setIsOpen={setDeleteModalIsOpen}
            wineToDelete={{ id: wine.wineId, name: wine.name }}
          />
        </>
      )}
    </div>
  );
};

export default EditWinePage;
