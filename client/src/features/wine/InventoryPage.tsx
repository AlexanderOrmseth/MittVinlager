import WineFilter from "./list/WineFilter";
import WineList from "./list/WineList";
import { useAppSelector } from "../../app/store/configureStore";
import { getParams } from "./slices/wineSlice";
import { useGetAllWineQuery } from "../api/apiSlice";
import Paginator from "./list/Paginator";

const InventoryPage = () => {
  const params = useAppSelector(getParams);
  const { data, isLoading, isSuccess } = useGetAllWineQuery(params);

  return (
    <>
      <div className="flex flex-grow flex-1 min-h-full gap-4 sm:flex-row flex-col">
        <WineFilter metaData={data?.metaData || null} />

        <div className="flex flex-1 flex-col">
          <Paginator
            metaData={data?.metaData || null}
            isLoading={isLoading}
            top={true}
          />

          {isLoading && <div>loading</div>}
          {isSuccess && data.items && (
            <WineList wine={data.items} metaData={data.metaData} />
          )}

          <Paginator
            metaData={data?.metaData || null}
            isLoading={isLoading}
            top={false}
          />
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
