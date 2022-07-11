import { useParams } from "react-router-dom";
import { useGetWineByIdQuery } from "../../features/api/apiSlice";

const useFetchSingleWine = () => {
  const { id } = useParams<{ id: string | undefined }>();
  // fetch wine
  const { data: wine, ...status } = useGetWineByIdQuery(id);

  return { id, wine, status };
};

export default useFetchSingleWine;
