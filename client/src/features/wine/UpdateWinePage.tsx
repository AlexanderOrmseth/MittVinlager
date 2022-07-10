import { PencilSimpleLine } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../app/api/api";
import Spinner from "../../app/components/loading/Spinner";
import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";
import Title from "../../app/layout/Title";
import { FormModel } from "../../app/models/wine";
import { useAppDispatch } from "../../app/store/configureStore";
import WineForm from "./form/WineForm";
import { triggerFetch } from "./slices/wineSlice";

const UpdateWinePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wine, id, status } = useFetchSingleWine();
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  if (status === "loading") return <Spinner text="Laster vin..." />;

  if (!wine) return <div>vinen eksisterer ikke!</div>;

  const onSubmit = async (data: FormModel) => {
    if (!id) {
      console.log("Id was undefined or null");
      return;
    }

    try {
      await api.Wine.updateWine(data, parseInt(id));
      dispatch(triggerFetch());
      navigate("/inventory");
    } catch (error: any) {
      console.error("Update wine error", error);
      if (error) setServerErrors(error);
    }
  };

  return (
    <div>
      <Title title="Rediger Vin" border Icon={PencilSimpleLine}>
        <p>
          Her kan du legge til vin. Trykk på "Hent fra Vinmonopolet" knappen for
          å hente vin fra Vinmonopolet.no.
        </p>
      </Title>
      <WineForm onSubmit={onSubmit} wine={wine} serverErrors={serverErrors} />
    </div>
  );
};

export default UpdateWinePage;
