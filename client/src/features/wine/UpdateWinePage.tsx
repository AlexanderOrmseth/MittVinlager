import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../app/api";
import { FormModel } from "../../app/models/wine";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import WineForm from "./form/WineForm";
import { getWineById } from "./slices/wineAsyncThunks";
import { wineSelectors } from "./slices/wineSlice";

const UpdateWinePage = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const dispatch = useAppDispatch();
  const wine = useAppSelector((state) => wineSelectors.selectById(state, id!));
  const { status } = useAppSelector((state) => state.wine);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  useEffect(() => {
    // if no article -> fetch
    if (!wine) dispatch(getWineById(parseInt(id!)));
  }, [dispatch, id, wine]);

  if (status === "loading") return <div>Laster inn vin!</div>;

  if (!wine) return <div>vinen eksisterer ikke!</div>;

  const onSubmit = async (data: FormModel) => {
    try {
      console.log(data);
      //const response = await api.Wine.updateWine(data);
      //console.log("update wine response", response);
    } catch (error: any) {
      console.error("Update wine error", error);
      if (error) {
        setServerErrors(error);
      }
    }
  };

  return (
    <div>
      <WineForm
        title="Rediger Vin"
        submitText="Rediger vin"
        onSubmit={onSubmit}
        wine={wine}
        serverErrors={serverErrors}
      />
    </div>
  );
};

export default UpdateWinePage;
