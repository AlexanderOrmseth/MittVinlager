import WineFilter from "./list/WineFilter";
import WineList from "./list/WineList";
import { useAppSelector } from "../../app/store/configureStore";
import { getParams } from "./wineSlice";
import { useGetAllWineQuery } from "../../app/services/wineApi";
import Paginator from "./list/Paginator";
import Spinner from "../../app/components/loading/Spinner";
import ErrorBox from "../../app/components/ErrorBox";
import { AnimatePresence } from "framer-motion";

const InventoryPage = () => {
  const params = useAppSelector(getParams);
  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetAllWineQuery(params);

  let content;
  if (isLoading || isFetching) content = <Spinner text="Laster..." />;
  else if (isSuccess)
    content = <WineList wine={data.items} metaData={data.metaData} />;
  else if (isError) content = <ErrorBox message="Something went wrong.." />;

  return (
    <div className="flex flex-grow flex-1 min-h-full gap-4 md:flex-row flex-col">
      <WineFilter
        metaData={data?.metaData}
        isFetchingWine={isFetching || isLoading}
      />

      <div className="flex flex-1 flex-col">
        <Paginator
          metaData={data?.metaData}
          isLoading={isLoading || isFetching}
          top={true}
        />

        <div className="flex flex-1 block-less-muted flex-col">
          <AnimatePresence initial={false}>{content}</AnimatePresence>
        </div>

        <Paginator
          metaData={data?.metaData}
          isLoading={isLoading || isFetching}
          top={false}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
