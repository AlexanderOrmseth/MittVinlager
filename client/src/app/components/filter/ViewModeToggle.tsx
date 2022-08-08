import { Switch } from "@headlessui/react";
import { setGridView, setHideFilter } from "../../../features/wine/wineSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { Funnel } from "phosphor-react";

interface Props {
  disabled?: boolean;
}

const ViewModeToggle = ({ disabled }: Props) => {
  const { gridView, hideFilter } = useAppSelector((state) => state.wine);
  const dispatch = useAppDispatch();

  return (
    <div className="i-flex-row">
      <button
        className="btn-white hidden px-2 py-1 md:block"
        onClick={() => dispatch(setHideFilter(!hideFilter))}
      >
        <Funnel size={"1.2rem"} />
      </button>

      <Switch
        disabled={disabled}
        checked={gridView}
        onChange={() => dispatch(setGridView(!gridView))}
        className="inline-flex items-center gap-x-2"
      >
        <div className="dark:bg-gray-950 relative flex h-6 w-12 rounded-full border bg-slate-50 transition-colors duration-100 hover:border-gray-300 hover:bg-slate-100 dark:border-gray-700 dark:hover:border-gray-600">
          <span
            className={`${
              gridView ? "translate-x-full" : "translate-x-0"
            } inline-flex h-full w-1/2 items-center p-0.5 transition ease-in-out`}
          >
            <div className="dark:bg-blue-wine-200 flex h-full w-full items-center justify-center rounded-full bg-slate-500 text-slate-50"></div>
          </span>
        </div>

        <small className="text-less-muted min-w-[40px] text-left">
          {gridView ? "Rutenett" : "Liste"}
        </small>
      </Switch>
    </div>
  );
};

export default ViewModeToggle;
