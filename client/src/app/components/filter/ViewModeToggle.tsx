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
      className={`relative flex bg-slate-200 hover:bg-slate-300 transition-colors duration-100 w-full rounded-full`}
    >
      <span
        className={`${
          gridView ? "translate-x-full" : "translate-x-0"
        } inline-flex items-center h-full w-1/2 transform p-1 transition ease-in-out`}
      >
        <p className="rounded-full w-full flex gap-x-1 justify-center text-blue-wine-500  bg-white">
          {gridView ? (
            <SquaresFour
              weight="regular"
              size="1.5rem"
              className="text-blue-wine-500"
            />
          ) : (
            <Rows size="1.5rem" className="text-blue-wine-500" />
          )}
        </p>
      </span>
    </Switch>
  );
};

export default ViewModeToggle;
