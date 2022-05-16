import { Robot, SmileyXEyes } from "phosphor-react";
import { useEffect } from "react";
import BallTriangle from "react-loading-icons/dist/components/ball-triangle";
import Grid from "react-loading-icons/dist/components/grid";
import SpinningCircles from "react-loading-icons/dist/components/spinning-circles";
import { Link } from "react-router-dom";
import WineCardSkeleton from "../../../app/components/loading/WineCardSkeleton";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { allWine } from "../slices/wineAsyncThunks";
import { initialParams, wineSelectors } from "../slices/wineSlice";
import Paginator from "./Paginator";
import WineCard from "./WineCard";

interface Props {}
const WineList = () => {
  const wine = useAppSelector(wineSelectors.selectAll);
  const { allFetched, status, wineParams } = useAppSelector(
    (state) => state.wine
  );

  const dispatch = useAppDispatch();

  // Fetch wine
  useEffect(() => {
    if (!allFetched) dispatch(allWine());
  }, [dispatch, allFetched]);

  let content = null;

  // loading
  if (status === "loading") {
    content = (
      <div className="grid p-4 md:p-6 lg:p-8 md:grid-cols-2 gap-x-4 gap-y-4">
        <WineCardSkeleton />
        <WineCardSkeleton />
        <WineCardSkeleton />
        <WineCardSkeleton />
      </div>
    );
  }
  // no wine
  else if (!wine.length) {
    if (wineParams === initialParams) {
      content = (
        <div className="flex text-slate-500 items-center justify-center flex-col gap-y-2 p-4">
          <SmileyXEyes size="5rem" weight="light" />
          <p>Du har ingen vin lagret!</p>
          <Link to="new">Legg til vin</Link>
        </div>
      );
    } else {
      content = (
        <div className="flex text-slate-500 items-center justify-center flex-col gap-y-2 p-4">
          <Robot size="5rem" weight="light" />
          <p>Beep boop, du har ingen vin som treffer valgt filter.</p>
          <button className="btn-primary">Tilbakestill filter</button>
        </div>
      );
    }
  }
  // else
  else {
    content = (
      <div className="grid p-4 md:p-6 lg:p-8 md:grid-cols-2 gap-x-4 gap-y-4">
        {wine.map((w) => (
          <WineCard key={w.wineId} wine={w} />
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Paginator status={status} top={true} />

      {content}

      <Paginator status={status} top={false} />
    </div>
  );
};

export default WineList;
