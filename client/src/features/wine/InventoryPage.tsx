import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import WineList from "./list/WineList";
import { allWine, getFilters } from "./slices/wineAsyncThunks";
import { wineSelectors } from "./slices/wineSlice";

const InventoryPage = () => {
  const wine = useAppSelector(wineSelectors.selectAll);
  const { allFetched, filtersFetched, filterOptions, metaData, wineParams } =
    useAppSelector((state) => state.wine);
  const dispatch = useAppDispatch();

  // Fetch wine
  useEffect(() => {
    if (!allFetched) dispatch(allWine());
  }, [dispatch, allFetched]);

  // Fetch filters
  useEffect(() => {
    if (!filtersFetched) dispatch(getFilters());
  }, [filtersFetched, dispatch]);

  return (
    <div>
      <h1>Inventory Page</h1>
      <div className="grid"></div>
      {allFetched && (
        <div className="mb-4">
          <p className="text-lg text-blue-900 font-bold">metaData</p>
          <pre className="p-4 inline-block bg-yellow-50 border border-orange-400 text-sm leading-4 text-yellow-700 text-medium">
            {JSON.stringify(metaData, null, 4)}
          </pre>
          <WineList wineList={wine} />
        </div>
      )}
      {filtersFetched && (
        <>
          <div className="mt-4">
            <p className="text-lg text-blue-900 font-bold">filterOptions</p>
            <pre className="p-4 inline-block bg-yellow-50 border border-yellow-400 text-sm leading-4 text-yellow-700 text-medium">
              {JSON.stringify(filterOptions, null, 4)}
            </pre>
          </div>
          <div className="mt-4">
            <p className="text-lg text-blue-900 font-bold">wineParams</p>
            <pre className="p-4 inline-block bg-yellow-50 border border-yellow-400 text-sm leading-4 text-yellow-700 text-medium">
              {JSON.stringify(wineParams, null, 4)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryPage;
