import {
  ArrowCounterClockwise,
  Ghost,
  PlusCircle,
  Robot,
} from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteWineModal from "../../../app/components/modals/DeleteWineModal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { resetParams } from "../wineSlice";
import WineCard from "./WineCard";
import WineRowItem from "./WineRowItem";
import { Wine } from "../../../app/models/wine";
import { MetaData } from "../../../app/models/pagination";
import InventoryMessage from "./InventoryMessage";

interface Props {
  wine: Wine[] | [];
  metaData: MetaData;
}

const WineList = ({ wine, metaData }: Props) => {
  const { gridView } = useAppSelector((state) => state.wine);

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [wineToDelete, setWineToDelete] = useState<{
    id: null | number;
    name: null | string;
  }>({ id: null, name: null });

  const handleDeleteWine = (id: number, name: string) => {
    setWineToDelete({ id, name });
    setIsOpen(true);
  };

  // TODO: have a useCallBack UseDebounce here that is passed to components so they share the timout

  let content;
  // loading

  if (!metaData.totalCount) {
    content = (
      <InventoryMessage
        Icon={Ghost}
        message={<>Du har ikke lagret noen vin.</>}
      >
        <Link to="new" className="btn-white-large">
          <PlusCircle size="1.75em" />
          Legg til vin
        </Link>
      </InventoryMessage>
    );
  } else if (wine.length === 0) {
    content = (
      <InventoryMessage
        Icon={Robot}
        message={
          <>
            <i className="opacity-70">Beep boop!</i> Du har ingen vin som
            treffer valgt filter.
          </>
        }
      >
        <button
          className="btn-white-large"
          onClick={() => dispatch(resetParams())}
        >
          <ArrowCounterClockwise size="1.75em" />
          Tilbakestill
        </button>
      </InventoryMessage>
    );
  } else {
    content = (
      <div
        className={`${gridView ? "grid lg:grid-cols-2 gap-2" : "space-y-2"}`}
      >
        {wine.map((item) =>
          gridView ? (
            <WineCard
              key={item.wineId}
              wine={item}
              handleDeleteWine={handleDeleteWine}
            />
          ) : (
            <WineRowItem
              key={item.wineId}
              wine={item}
              handleDeleteWine={handleDeleteWine}
            />
          )
        )}
      </div>
    );
  }

  return (
    <>
      {content}
      <DeleteWineModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        wineToDelete={wineToDelete}
      />
    </>
  );
};

export default WineList;
