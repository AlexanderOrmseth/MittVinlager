import AsideDisclosure from "../../../app/components/AsideDisclosure";
import WineCheckboxFilter from "../../../app/components/filter/WineCheckboxFilter";
import WineSearch from "../../../app/components/filter/WineSearch";
import ListBox from "../../../app/components/ListBox";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { resetParams, setParams } from "../wineSlice";
import { useGetWineFiltersQuery } from "../../api/apiSlice";
import { MetaData } from "../../../app/models/pagination";

interface Props {
  metaData: MetaData | null;
}

const WineFilter = ({ metaData }: Props) => {
  const { wineParams } = useAppSelector((state) => state.wine);
  const dispatch = useAppDispatch();

  const { data: filters, ...filterStatus } = useGetWineFiltersQuery();

  if (!filters) return null;

  const disabled = filterStatus.isLoading || !metaData?.totalCount;

  return (
    <aside className="basis-60 relative">
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
              displayText: "Pris (synkende)",
            },
            {
              value: "country",
              displayText: "Land",
            },
            {
              value: "countryDesc",
              displayText: "Land (synkende)",
            },
            {
              value: "type",
              displayText: "Type",
            },
            {
              value: "typeDesc",
              displayText: "Type (synkende)",
            },
          ]}
          disabled={disabled}
          selected={wineParams.orderBy}
          onChange={(item: string) => dispatch(setParams({ orderBy: item }))}
        />
        <button
          disabled={disabled}
          className="btn-secondary rounded-full w-full disabled-btn"
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
            items={filters.countries}
            checked={wineParams.countries}
          />
        </AsideDisclosure>

        <AsideDisclosure text="Typer">
          <WineCheckboxFilter
            disabled={disabled}
            onChange={(items: string[]) =>
              dispatch(setParams({ types: items }))
            }
            items={filters.types}
            checked={wineParams.types}
          />
        </AsideDisclosure>
      </div>
    </aside>
  );
};

export default WineFilter;
