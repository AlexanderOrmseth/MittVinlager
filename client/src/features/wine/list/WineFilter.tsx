import { useEffect } from "react";
import AsideDisclosure from "../../../app/components/AsideDisclosure";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { getFilters } from "../slices/wineAsyncThunks";

const WineFilter = () => {
  const { filtersFetched, filterOptions, wineParams } = useAppSelector(
    (state) => state.wine
  );
  const dispatch = useAppDispatch();

  // Fetch filters
  useEffect(() => {
    if (!filtersFetched) dispatch(getFilters());
  }, [filtersFetched, dispatch]);

  return (
    <div className="flex gap-y-4 flex-col">
      <AsideDisclosure text="Land">
        <div>countries here</div>
      </AsideDisclosure>

      <AsideDisclosure text="Typer">
        <div>Typer her</div>
      </AsideDisclosure>

      <AsideDisclosure text="filterOptions">
        <pre className="inline-block bg-yellow-50 border border-yellow-400 text-sm leading-4 text-yellow-700 text-medium">
          {JSON.stringify(filterOptions, null, 2)}
        </pre>
      </AsideDisclosure>

      <AsideDisclosure text="wineParams">
        <pre className="inline-block bg-yellow-50 border border-yellow-400 text-sm leading-4 text-yellow-700 text-medium">
          {JSON.stringify(wineParams, null, 2)}
        </pre>
      </AsideDisclosure>
    </div>
  );
};

export default WineFilter;
