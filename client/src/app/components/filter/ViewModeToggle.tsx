import { Switch } from "@headlessui/react";
import { setGridView } from "../../../features/wine/wineSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

interface Props {
  disabled?: boolean;
}

const ViewModeToggle = ({ disabled }: Props) => {
  const { gridView } = useAppSelector((state) => state.wine);
  const dispatch = useAppDispatch();

  return (
    <Switch
      disabled={disabled}
      checked={gridView}
      onChange={() => dispatch(setGridView(!gridView))}
      className="inline-flex gap-x-2 items-center"
    >
      <div className="relative flex bg-slate-50 dark:bg-gray-950 dark:border-gray-700 hover:bg-slate-100 transition-colors duration-100 w-12 h-6 border hover:border-gray-300 dark:hover:border-gray-600 rounded-full">
        <span
          className={`${
            gridView ? "translate-x-full" : "translate-x-0"
          } inline-flex items-center h-full w-1/2 transform p-0.5 transition ease-in-out`}
        >
          <div className="w-full h-full rounded-full items-center flex justify-center text-slate-50 bg-slate-500 dark:bg-blue-wine-200"></div>
        </span>
      </div>

      <small className="min-w-[40px] text-less-muted text-left">
        {gridView ? "Grid" : "Table"}
      </small>
    </Switch>
  );
};

export default ViewModeToggle;
