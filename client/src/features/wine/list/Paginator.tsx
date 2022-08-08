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
      } block-muted xts:px-4 xts:text-sm xts:gap-4 flex-row items-center justify-between gap-1 py-1 px-2 text-xs font-medium text-gray-900 dark:text-gray-400  md:py-1.5 
   `}
    >
      <div className="i-flex-row">
        {top && (
          <ViewModeToggle disabled={!metaData || metaData.totalCount === 0} />
        )}
        <div className={`${top ? "border-l pl-2 dark:border-gray-700" : ""}`}>
          <span className="hidden opacity-70 sm:inline">Totalt:</span>
          <span className="inline opacity-70 sm:hidden">T:</span>{" "}
          {metaData?.resultCount}/{metaData?.totalCount}
        </div>
      </div>
      <div className="xts:gap-2 flex flex-row items-center gap-1 sm:gap-4">
        <div>
          <span className="hidden opacity-70 sm:inline">Per side:</span>
          <span className="inline opacity-70 sm:hidden">PS:</span>{" "}
          {metaData?.pageSize}
        </div>
        <div>
          <span className="hidden opacity-70 sm:inline">Side:</span>
          <span className="inline opacity-70 sm:hidden">S:</span>{" "}
          {metaData?.currentPage}/{metaData?.totalPages}
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
              className="rounded px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-25 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100"
              onClick={handlePreviousPage}
            >
              <CaretLeft size="1.5rem" />
            </button>
            <button
              disabled={rightDisabled}
              className="rounded px-2 py-1  text-slate-700 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-25 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100"
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
