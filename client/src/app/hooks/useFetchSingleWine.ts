import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getWineById } from "../../features/wine/slices/wineAsyncThunks";
import { wineSelectors } from "../../features/wine/slices/wineSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

const useFetchSingleWine = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const dispatch = useAppDispatch();
  const wine = useAppSelector((state) => wineSelectors.selectById(state, id!));
  const { status } = useAppSelector((state) => state.wine);

  useEffect(() => {
    if (!wine) dispatch(getWineById(parseInt(id!)));
  }, [dispatch, id, wine]);

  return { wine, status, id };
};

export default useFetchSingleWine;
