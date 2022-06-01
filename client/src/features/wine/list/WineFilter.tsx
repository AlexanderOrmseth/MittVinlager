import { Switch } from "@headlessui/react";
import { Rows, SquaresFour } from "phosphor-react";
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
import { setGridView, setParams } from "../slices/wineSlice";

const WineFilter = () => {
  const { filtersFetched, filterOptions, wineParams, gridView, status } =
    useAppSelector((state) => state.wine);
  const dispatch = useAppDispatch();

  // Fetch filters
  useEffect(() => {
    if (!filtersFetched) dispatch(getFilters());
  }, [filtersFetched, dispatch]);

  const disabled = status === "loading";

  return (
    <div className="space-y-4 sm:pb-0 sm:sticky sm:top-4 sm:overflow-y-auto sm:pr-2 sm:max-h-[calc(100vh-4rem)]">
      <WineSearch disabled={disabled} />
      <div>
        <label className="label">Visningsmodus</label>
        <Switch
          disabled={disabled}
          checked={gridView}
          onChange={() => dispatch(setGridView(!gridView))}
          className={`relative inline-flex bg-slate-200 hover:bg-slate-300 transition-colors duration-100 w-full rounded-full`}
        >
          <span
            className={`${
              gridView ? "translate-x-full" : "translate-x-0"
            } inline-flex items-center h-full w-1/2 transform p-1 transition ease-in-out`}
          >
            <p className="rounded-full w-full flex gap-x-1 justify-center text-blue-wine-500 text-sm font-medium items-center py-1 bg-white">
              {gridView ? (
                <SquaresFour size="2rem" className="text-blue-wine-500" />
              ) : (
                <Rows size="2rem" className="text-blue-wine-500" />
              )}
              {gridView ? "Grid" : "Table"}
            </p>
          </span>
        </Switch>
      </div>
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
    </div>
  );
};

export default WineFilter;
