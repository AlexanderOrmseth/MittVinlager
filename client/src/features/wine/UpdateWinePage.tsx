import { PencilSimpleLine } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../app/components/loading/Spinner";
import Title from "../../app/layout/Title";
import CreateOrUpdate from "./form/CreateOrUpdate";
import { useUpdateWineMutation } from "../../app/services/wineApi";
import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";
import toast from "react-hot-toast";
import NotFound from "../../app/layout/NotFound";
import ErrorBox from "../../app/components/ErrorBox";
import DeleteWineModal from "../../app/components/modals/DeleteWineModal";
import { WineFormData } from "./form/validationSchema";

const UpdateWinePage = () => {
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

  console.log(wine);

  const onSubmit = async (data: WineFormData) => {
    // debug
    console.log(data);

    await updateWine({ id, data })
      .unwrap()
      .then(() => {
        toast.success(`Oppdaterte vin!`, {
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((err) => {
        // show server validation errors
        console.error("Update wine error", err);
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
          Trykk på<strong className="mx-1">Hent fra Vinmonopolet</strong>for å
          hente vininformasjon fra Vinmonopolet.
        </p>
      </Title>
      {wineStatus.isSuccess && wine && (
        <>
          <CreateOrUpdate
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

export default UpdateWinePage;
