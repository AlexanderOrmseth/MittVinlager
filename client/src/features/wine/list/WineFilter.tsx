import AsideDisclosure from "../../../app/components/AsideDisclosure";
import WineCheckboxFilter from "../../../app/components/filter/WineCheckboxFilter";
import WineSearch from "../../../app/components/filter/WineSearch";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { getParams, resetParams, setParams } from "../wineSlice";
import { useGetWineFiltersQuery } from "../../api/apiSlice";
import { MetaData } from "../../../app/models/pagination";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ArrowCounterClockwise, Info } from "phosphor-react";
import OrderBy from "./OrderBy";

interface Props {
  metaData: MetaData | null | undefined;
  isFetchingWine: boolean;
}

const checkMismatch = (paramsArr: string[], filterArr: string[]): boolean => {
  return paramsArr.some((s) => !filterArr.includes(s));
};

const WineFilter = ({ metaData, isFetchingWine }: Props) => {
  const params = useAppSelector(getParams);
  const dispatch = useAppDispatch();


  const { data: filters, ...filterStatus } = useGetWineFiltersQuery();

  // check for mismatch and reset params
  useEffect(() => {
    if (filters && !filterStatus.isLoading) {
      if (
        checkMismatch(params.types, filters.types) ||
        checkMismatch(params.countries, filters.countries)
      ) {
        dispatch(resetParams());
        toast("Filter ble tilbakestilt", {
          icon: <Info size={28} className="text-orange-600" />,
        });
      }
    }
  }, [
    dispatch,
    filterStatus.isLoading,
    filters,
    params.countries,
    params.types,
  ]);

  if (!filters) return null;

  const disabled =
    filterStatus.isLoading || !metaData?.totalCount || isFetchingWine;

  return (
    <aside className="basis-60 relative">
      <div className="space-y-4 block-muted md:sticky md:top-4 sm:overflow-y-auto p-4 md:max-h-[calc(100vh-6rem)]">
        <OrderBy disabled={disabled} selectedOrder={params.orderBy} />
        <button
          disabled={disabled}
          className="btn-white disabled-btn i-flex-row justify-center"
          onClick={() => dispatch(resetParams())}
        >
          <ArrowCounterClockwise size="1.25rem" />
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
            checked={params.countries}
          />
        </AsideDisclosure>

        <AsideDisclosure text="Typer">
          <WineCheckboxFilter
            disabled={disabled}
            onChange={(items: string[]) =>
              dispatch(setParams({ types: items }))
            }
            items={filters.types}
            checked={params.types}
          />
        </AsideDisclosure>
      </div>
    </aside>
  );
};

export default WineFilter;
