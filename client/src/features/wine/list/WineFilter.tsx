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
import { setParams } from "../slices/wineSlice";

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
    <div className="flex gap-y-4 flex-col">
      <WineSearch disabled={disabled} />
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

      {/*   <AsideDisclosure text="filterOptions">
        <pre className="inline-block bg-yellow-50 border border-yellow-400 text-sm leading-4 text-yellow-700 text-medium">
          {JSON.stringify(filterOptions, null, 2)}
        </pre>
      </AsideDisclosure>

      <AsideDisclosure text="wineParams">
        <pre className="inline-block bg-yellow-50 border border-yellow-400 text-sm leading-4 text-yellow-700 text-medium">
          {JSON.stringify(wineParams, null, 2)}
        </pre>
      </AsideDisclosure> */}
    </div>
  );
};

export default WineFilter;
