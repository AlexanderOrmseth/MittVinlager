import { Ghost, Robot, SmileyXEyes } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WineCardSkeleton from "../../../app/components/loading/WineCardSkeleton";
import DeleteWineModal from "../../../app/components/modals/DeleteWineModal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { allWine } from "../slices/wineAsyncThunks";
import { initialParams, wineSelectors } from "../slices/wineSlice";
import Paginator from "./Paginator";
import WineCard from "./WineCard";

const WineList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wineToDelete, setWineToDelete] = useState<{
    id: null | number;
    name: null | string;
  }>({ id: null, name: null });

  const wine = useAppSelector(wineSelectors.selectAll);
  const { allFetched, status, wineParams } = useAppSelector(
    (state) => state.wine
  );

  const dispatch = useAppDispatch();

  // Fetch wine
  useEffect(() => {
    if (!allFetched) {
      const promise = dispatch(allWine());

      return () => {
        promise.abort();
      };
    }
  }, [dispatch, allFetched]);

  const handleDeleteWine = (id: number, name: string) => {
    setWineToDelete({ id, name });
    setIsOpen(true);
  };

  let content = null;
  // loading
  if (status === "loading") {
    content = (
      <div className="grid md:grid-cols-2 gap-x-4 gap-y-4">
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
        <div className="flex text-slate-500 items-center justify-center flex-col gap-y-2 ">
          <Ghost size="5rem" weight="light" />
          <p>Du har ikke lagret noen vin</p>
          <Link to="new" className="btn-primary h-auto py-2">
            Legg til vin
          </Link>
        </div>
      );
    } else {
      content = (
        <div className="flex text-slate-500 items-center justify-center flex-col gap-y-2">
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
      <div className="grid lg:grid-cols-2 gap-2">
        {wine.map((w) => (
          <WineCard
            key={w.wineId}
            wine={w}
            handleDeleteWine={handleDeleteWine}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <Paginator status={status} top={true} />

      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-slate-50 rounded-lg my-4">
        {content}
      </div>
      <Paginator status={status} top={false} />

      <DeleteWineModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        wineToDelete={wineToDelete}
      />
    </div>
  );
};

export default WineList;
