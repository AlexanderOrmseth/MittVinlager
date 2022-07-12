import { Ghost, Robot } from "phosphor-react";
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

  let content;
  // loading

  if (!metaData.totalCount) {
    content = (
      <div className="flex text-slate-500 items-center justify-center flex-col gap-y-2 ">
        <Ghost size="5rem" weight="light" />
        <p>Du har ikke lagret noen vin</p>
        <Link to="new" className="btn-primary">
          Legg til vin
        </Link>
      </div>
    );
  } else if (wine.length === 0) {
    content = (
      <div className="flex text-slate-500 items-center justify-center flex-col gap-y-2">
        <Robot size="5rem" weight="light" />
        <p>Beep boop! Du har ingen vin som treffer valgt filter.</p>
        <button onClick={() => dispatch(resetParams())} className="btn-primary">
          Tilbakestill filter
        </button>
      </div>
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
    <div className="flex flex-1 flex-col">
      {content}
      <DeleteWineModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        wineToDelete={wineToDelete}
      />
    </div>
  );
};

export default WineList;
