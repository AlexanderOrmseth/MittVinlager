import { useEffect } from "react";
import BallTriangle from "react-loading-icons/dist/components/ball-triangle";
import Grid from "react-loading-icons/dist/components/grid";
import SpinningCircles from "react-loading-icons/dist/components/spinning-circles";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { allWine } from "../slices/wineAsyncThunks";
import { wineSelectors } from "../slices/wineSlice";
import Paginator from "./Paginator";
import WineCard from "./WineCard";

interface Props {}
const WineList = () => {
  const wine = useAppSelector(wineSelectors.selectAll);
  const { allFetched, status } = useAppSelector((state) => state.wine);
  const dispatch = useAppDispatch();

  // Fetch wine
  useEffect(() => {
    if (!allFetched) dispatch(allWine());
  }, [dispatch, allFetched]);

  return (
    <div className="border rounded-lg">
      <Paginator status={status} top={true} />
      {status !== "loading" ? (
        <div className="grid p-8 grid-cols-2 gap-x-4 gap-y-4">
          {wine.map((w) => (
            <WineCard key={w.wineId} wine={w} />
          ))}
        </div>
      ) : (
        <div className="py-6">
          <BallTriangle className="mx-auto" fill="black" />
          <p className="text-center text-slate-600 my-3">Laster...</p>
        </div>
      )}

      <Paginator status={status} top={false} />
    </div>
  );
};

export default WineList;
