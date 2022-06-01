import { AnimatePresence, motion } from "framer-motion";
import { Ghost, Robot, Spinner } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import WineCardSkeleton from "../../../app/components/loading/WineCardSkeleton";
import DeleteWineModal from "../../../app/components/modals/DeleteWineModal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { allWine } from "../slices/wineAsyncThunks";
import { resetParams, wineSelectors } from "../slices/wineSlice";
import Paginator from "./Paginator";
import WineCard from "./WineCard";

const WineList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wineToDelete, setWineToDelete] = useState<{
    id: null | number;
    name: null | string;
  }>({ id: null, name: null });

  const wine = useAppSelector(wineSelectors.selectAll);
  const { allFetched, status, metaData } = useAppSelector(
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
    content = <Spinner size="5rem" className="animate-spin" />;
  }
  // no wine
  else if (!wine.length) {
    if (!metaData?.totalCount) {
      content = (
        <div className="flex text-slate-500 items-center justify-center flex-col gap-y-2 ">
          <Ghost size="5rem" weight="light" />
          <p>Du har ikke lagret noen vin</p>
          <Link to="new" className="btn-primary">
            Legg til vin
          </Link>
        </div>
      );
    } else {
      content = (
        <div className="flex text-slate-500 items-center justify-center flex-col gap-y-2">
          <Robot size="5rem" weight="light" />
          <p>Beep boop! Du har ingen vin som treffer valgt filter.</p>
          <button
            onClick={() => dispatch(resetParams())}
            className="btn-primary"
          >
            Tilbakestill filter
          </button>
        </div>
      );
    }
  }
  // else
  else {
    content = (
      <div className="grid lg:grid-cols-2 gap-2">
        <AnimatePresence>
          {wine.map((w, i) => (
            <motion.div
              key={w.wineId}
              layout
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: 0.2,
                delay: i * 0.05,
              }}
            >
              <WineCard wine={w} handleDeleteWine={handleDeleteWine} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <Paginator status={status} top={true} />

      <div className="flex-1 h-full p-4 md:p-6 lg:p-8 bg-slate-50 rounded-lg my-4">
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
