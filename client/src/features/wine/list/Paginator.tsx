import { useAppDispatch } from "../../../app/store/configureStore";
import { setPageNumber } from "../wineSlice";
import ViewModeToggle from "../../../app/components/filter/ViewModeToggle";
import { ThreeDots } from "react-loading-icons";
import { CaretLeft, CaretRight } from "phosphor-react";
import { MetaData } from "../../../app/models/pagination";

interface Props {
  isLoading: boolean;
  top: boolean;
  metaData: MetaData | null | undefined;
}

const Paginator = ({ isLoading, top, metaData }: Props) => {
  const dispatch = useAppDispatch();

  // hide bottomBar or both
  if (
    (metaData && metaData.totalPages === 1 && !top) ||
    (metaData && !metaData.totalCount)
  ) {
    return null;
  }

  const leftDisabled = metaData == null ? true : metaData.currentPage < 2;
  const rightDisabled =
    metaData == null ? true : metaData.currentPage >= metaData.totalPages;

  const handleNextPage = () => {
    if (metaData && !rightDisabled) {
      const page = metaData.currentPage + 1;
      dispatch(setPageNumber(page));
    }
  };

  const handlePreviousPage = () => {
    if (metaData && !leftDisabled) {
      const page = metaData.currentPage - 1;
      dispatch(setPageNumber(page));
    }
  };

  return (
    <div
      className={`flex ${
        top ? "mb-4" : "mt-4"
      } block-muted md:py-1.5 py-1 px-4 items-center text-sm gap-4 flex-row text-gray-900 dark:text-gray-400 font-medium  justify-between 
   `}
    >
      <div className="i-flex-row">
        {top && (
          <ViewModeToggle disabled={!metaData || metaData.totalCount === 0} />
        )}
        <div className={`${top ? "border-l pl-2 dark:border-gray-700" : ""}`}>
          Totalt: {metaData?.resultCount}/{metaData?.totalCount}
        </div>
      </div>
      <div className="flex flex-row sm:gap-4 gap-2 items-center">
        <div>Per side: {metaData?.pageSize}</div>
        <div>
          Side: {metaData?.currentPage}/{metaData?.totalPages}
        </div>

        {isLoading ? (
          <ThreeDots
            height={"2rem"}
            width={"2.5rem"}
            className="mx-4"
            fill="gray"
          />
        ) : (
          <>
            <button
              disabled={leftDisabled}
              className="px-2 py-1 rounded disabled:cursor-not-allowed disabled:opacity-25 text-slate-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100 hover:text-slate-900 hover:bg-slate-100"
              onClick={handlePreviousPage}
            >
              <CaretLeft size="1.5rem" />
            </button>
            <button
              disabled={rightDisabled}
              className="px-2 py-1 rounded  disabled:cursor-not-allowed disabled:opacity-25 text-slate-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100 hover:text-slate-900 hover:bg-slate-100"
              onClick={handleNextPage}
            >
              <CaretRight size="1.5rem" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Paginator;
