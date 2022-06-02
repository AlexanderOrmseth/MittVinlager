import { useEffect } from "react";
import AsideDisclosure from "../../../app/components/AsideDisclosure";
import WineCheckboxFilter from "../../../app/components/filter/WineCheckboxFilter";
import WineSearch from "../../../app/components/filter/WineSearch";
import ListBox from "../../../app/components/ListBox";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { getFilters } from "../slices/wineAsyncThunks";
import { resetParams, setParams } from "../slices/wineSlice";

const WineFilter = () => {
  const { filtersFetched, filterOptions, wineParams, status } = useAppSelector(
    (state) => state.wine
  );
  const dispatch = useAppDispatch();

  // Fetch filters
  useEffect(() => {
    if (!filtersFetched) dispatch(getFilters());
  }, [filtersFetched, dispatch]);

  const disabled = status === "loading";

  return (
    <div className="space-y-4 sm:pb-0 sm:sticky sm:top-4 sm:overflow-y-auto sm:pr-2 sm:max-h-[calc(100vh-4rem)]">
      <ListBox
        label="Sorter"
        items={[
          {
            value: "name",
            displayText: "Navn",
          },
          {
            value: "price",
            displayText: "Pris",
          },
          {
            value: "priceDesc",
            displayText: "Pris desc",
          },
          {
            value: "country",
            displayText: "Land",
          },
          {
            value: "countryDesc",
            displayText: "Land desc",
          },
          {
            value: "type",
            displayText: "Type",
          },
          {
            value: "typeDesc",
            displayText: "Type desc",
          },
        ]}
        disabled={disabled}
        selected={wineParams.orderBy}
        onChange={(item: string) => dispatch(setParams({ orderBy: item }))}
      />
      <button
        disabled={disabled}
        className="btn-secondary rounded-full w-full"
        onClick={() => dispatch(resetParams())}
      >
        Tilbakestill
      </button>
      <WineSearch disabled={disabled} />

      <AsideDisclosure text="Land">
        <WineCheckboxFilter
          disabled={disabled}
          onChange={(items: string[]) =>
            dispatch(setParams({ countries: items }))
          }
          items={filterOptions.countries}
          checked={wineParams.countries}
        />
      </AsideDisclosure>

      <AsideDisclosure text="Typer">
        <WineCheckboxFilter
          disabled={disabled}
          onChange={(items: string[]) => dispatch(setParams({ types: items }))}
          items={filterOptions.types}
          checked={wineParams.types}
        />
      </AsideDisclosure>
    </div>
  );
};

export default WineFilter;
