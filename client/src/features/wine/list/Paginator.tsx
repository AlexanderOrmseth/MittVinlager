import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { setPageNumber } from "../slices/wineSlice";
import { CaretLeft, CaretRight } from "phosphor-react";
import { ThreeDots } from "react-loading-icons";
import ViewModeToggle from "../../../app/components/filter/ViewModeToggle";

interface Props {
  status: string;
  top: boolean;
}

const Paginator = ({ status, top }: Props) => {
  const dispatch = useAppDispatch();
  const { metaData } = useAppSelector((state) => state.wine);

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
    <div className="flex items-center border rounded bg-white dark:bg-gray-800/40 dark:border-gray-700 shadow-xxs">
      {top && <ViewModeToggle />}
      <div
        className={` ${
          top ? "" : ""
        } flex flex-1 md:py-1.5 py-1 px-4 items-center text-sm gap-4 flex-row text-gray-900 dark:text-gray-400 font-medium justify-between 
   `}
      >
        <div className="flex items-center">
          Totalt: {metaData?.resultCount}/{metaData?.totalCount}
        </div>
        <div className="flex flex-row sm:gap-4 gap-2 items-center">
          <div>Per side: {metaData?.pageSize}</div>
          <div>
            Side {metaData?.currentPage} av {metaData?.totalPages}
          </div>

          {status === "loading" && metaData ? (
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
    </div>
  );
};

export default Paginator;
