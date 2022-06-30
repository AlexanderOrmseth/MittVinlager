import { Switch } from "@headlessui/react";
import { SquaresFour, Rows } from "phosphor-react";
import { setGridView } from "../../../features/wine/slices/wineSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

const ViewModeToggle = () => {
  const { gridView, status } = useAppSelector((state) => state.wine);
  const dispatch = useAppDispatch();

  return (
    <Switch
      disabled={status === "loading"}
      checked={gridView}
      onChange={() => dispatch(setGridView(!gridView))}
      className={`relative flex bg-slate-50 hover:bg-slate-100 transition-colors duration-100 w-24 h-full rounded-l-sm border-r`}
    >
      <span
        className={`${
          gridView ? "translate-x-full" : "translate-x-0"
        } inline-flex items-center h-full w-1/2 transform p-1 transition ease-in-out`}
      >
        <div className="rounded-sm w-full h-full items-center flex justify-center text-slate-50 bg-slate-900">
          {gridView ? (
            <>
              <SquaresFour size="2rem" />
            </>
          ) : (
            <Rows size="2rem" />
          )}
        </div>
      </span>
    </Switch>
  );
};

export default ViewModeToggle;
