import { useParams } from "react-router-dom";
import { useGetWineByIdQuery } from "../services/wineApi";

const useFetchSingleWine = () => {
  const { id } = useParams<{ id: string | undefined }>();

  // validate
  const number = id ? +id : undefined;
  const skip = number ? isNaN(number) : true;

  // Do not fetch if id is not a number.
  const { data: wine, ...status } = useGetWineByIdQuery(number, { skip });

  // id can be undefined, handle this in caller component
  return { id: number, wine, status };
};

export default useFetchSingleWine;
