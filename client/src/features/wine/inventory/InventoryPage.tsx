import Filter from "./components/filter/Filter";
import List from "./components/List";
import { useAppSelector } from "../../../app/store/configureStore";
import { getParams } from "../wineSlice";
import { useGetAllWineQuery } from "../../../app/services/wineApi";
import Paginator from "./components/Paginator";
import Spinner from "../../../app/components/Spinner";
import ErrorBox from "../../../app/components/ErrorBox";

const InventoryPage = () => {
  const params = useAppSelector(getParams);
  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetAllWineQuery(params);

  let content;
  if (isLoading || isFetching) content = <Spinner text="Laster..." />;
  else if (isSuccess)
    content = <List wine={data.items} metaData={data.metaData} />;
  else if (isError) content = <ErrorBox message="Error, noe gikk galt..." />;

  return (
    <div className="flex min-h-full flex-1 grow flex-col gap-4 md:flex-row">
      <Filter
        metaData={data?.metaData}
        isFetchingWine={isFetching || isLoading}
      />

      <div className="flex flex-1 flex-col">
        <Paginator
          metaData={data?.metaData}
          isLoading={isLoading || isFetching}
          top={true}
        />
        <div className="block-less-muted flex flex-1 flex-col">{content}</div>
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
