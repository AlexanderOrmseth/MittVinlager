import AsideDisclosure from "../../../app/components/AsideDisclosure";
import WineCheckboxFilter from "../../../app/components/filter/WineCheckboxFilter";
import WineSearch from "../../../app/components/filter/WineSearch";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { getParams, resetParams, setHideFilter, setParams } from "../wineSlice";
import { useGetWineFiltersQuery } from "../../../app/services/wineApi";
import { MetaData } from "../../../app/models/pagination";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ArrowCounterClockwise, Funnel, Info } from "phosphor-react";
import OrderBy from "./OrderBy";
import ListBox from "../../../app/components/ListBox";
import RadioFilter from "./RadioFilter";
import FilterItem from "./FilterItem";
import useMediaQuery from "../../../app/hooks/useMediaQuery";
import { motion } from "framer-motion";

interface Props {
  metaData: MetaData | null | undefined;
  isFetchingWine: boolean;
}

const checkMismatch = (paramsArr: string[], filterArr: string[]): boolean => {
  return paramsArr.some((s) => !filterArr.includes(s));
};

const WineFilter = ({ metaData, isFetchingWine }: Props) => {
  const isSmall = useMediaQuery("(max-width: 767px)");
  const params = useAppSelector(getParams);
  const { hideFilter } = useAppSelector((state) => state.wine);

  /*const variants = isSmall
    ? {
        show: {
          opacity: 1,
          scale: 1,
          height: "auto",
        },
        hidden: {
          opacity: 1,
          scale: 1,
          height: 0,
        },
      }
    : {
        show: {
          opacity: 1,
          scale: 1,
          width: "auto",
        },
        hidden: {
          opacity: 1,
          scale: 1,
          width: 0,
        },
      };*/

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

  const selectedCount = (arr: string[]): string =>
    !arr.length ? "" : `(${arr.length})`;

  const disabled =
    filterStatus.isLoading || !metaData?.totalCount || isFetchingWine;

  return (
    <aside className="relative">
      <button
        onClick={() => dispatch(setHideFilter(!hideFilter))}
        className="btn-white i-flex-row justify-center text-lg transition md:py-2.5 md:text-2xl"
      >
        <Funnel size="1em" className="text-muted" />
        {/*{hideFilter && !isSmall
          ? ""
          : hideFilter
          ? "Vis filter"
          : "Skjul filter"}*/}
        <span className="text-muted block text-sm md:hidden">
          {hideFilter ? "Vis filter" : "Skjul filter"}
        </span>
      </button>

      <motion.div
        animate={{
          width: !isSmall ? (hideFilter ? "0px" : "280px") : "100%",
          height: hideFilter ? "0px" : "auto",
          opacity: hideFilter ? 0 : 1,
          padding: hideFilter ? 0 : "1rem",
          marginTop: hideFilter ? 0 : "1rem",
          borderWidth: hideFilter ? "0px" : "1px",
          transition: {
            duration: 0.22,
            type: "linear",
          },
        }}
        initial={false}
        className="block-muted space-y-6 sm:overflow-y-auto md:sticky md:top-4 md:max-h-[calc(100vh-6rem)] md:min-h-[300px]"
      >
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

        <FilterItem isChanged={params.countries.length > 0}>
          <AsideDisclosure title={`Land ${selectedCount(params.countries)}`}>
            <WineCheckboxFilter
              disabled={disabled}
              onChange={(items: string[]) =>
                dispatch(setParams({ countries: items }))
              }
              options={filters?.countries}
              checkedOptions={params.countries}
            />
          </AsideDisclosure>
        </FilterItem>

        <FilterItem isChanged={params.storageOption.length > 0}>
          <AsideDisclosure
            defaultOpen={params.storageOption.length > 0}
            title="Vinsamling"
          >
            <RadioFilter
              value={params.storageOption}
              options={[
                { displayText: "Alle", value: "" },
                {
                  displayText: "På lager",
                  value: "1",
                },
                { displayText: "Ikke på lager", value: "2" },
              ]}
              onChange={(val) => dispatch(setParams({ storageOption: val }))}
              disabled={disabled}
            />
          </AsideDisclosure>
        </FilterItem>

        <FilterItem isChanged={params.types.length > 0}>
          <AsideDisclosure title={`Typer ${selectedCount(params.types)}`}>
            <WineCheckboxFilter
              disabled={disabled}
              onChange={(items: string[]) =>
                dispatch(setParams({ types: items }))
              }
              options={filters?.types}
              checkedOptions={params.types}
            />
          </AsideDisclosure>
        </FilterItem>

        <FilterItem isChanged={params.recommendedFood.length > 0}>
          <AsideDisclosure
            defaultOpen={params.recommendedFood.length > 0}
            title={`Passer til ${selectedCount(params.recommendedFood)}`}
          >
            <WineCheckboxFilter
              disabled={disabled}
              onChange={(items: string[]) =>
                dispatch(setParams({ recommendedFood: items }))
              }
              options={filters?.recommendedFood}
              checkedOptions={params.recommendedFood}
            />
          </AsideDisclosure>
        </FilterItem>

        {filters?.grapes && (
          <FilterItem isChanged={params.grapes.length > 0}>
            <ListBox
              items={[{ displayText: "Alle", value: "" }].concat(
                filters.grapes.map((grape) => {
                  return { displayText: grape, value: grape };
                })
              )}
              selected={params.grapes}
              onChange={(val) => dispatch(setParams({ grapes: val }))}
              label="Råvarer"
              disabled={disabled}
            />
          </FilterItem>
        )}

        <FilterItem isChanged={params.favoriteOption.length > 0}>
          <AsideDisclosure
            defaultOpen={params.favoriteOption.length > 0}
            title="Favoritt"
          >
            <RadioFilter
              value={params.favoriteOption}
              options={[
                { displayText: "Alle", value: "" },
                {
                  displayText: "Kun favoritter",
                  value: "1",
                },
                { displayText: "Ikke favoritt", value: "2" },
              ]}
              onChange={(val) => dispatch(setParams({ favoriteOption: val }))}
              disabled={disabled}
            />
          </AsideDisclosure>
        </FilterItem>
      </motion.div>
    </aside>
  );
};

export default WineFilter;
