import {
  ArrowCounterClockwise,
  Ghost,
  MagicWand,
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
import LoadingButton from "../../../app/components/LoadingButton";
import { useAddTestDataMutation } from "../../../app/services/wineApi";
import toast from "react-hot-toast";

interface Props {
  wine: Wine[] | [];
  metaData: MetaData;
}

const WineList = ({ wine, metaData }: Props) => {
  const { gridView, hideFilter } = useAppSelector((state) => state.wine);

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [wineToDelete, setWineToDelete] = useState<{
    id: null | number;
    name: null | string;
  }>({ id: null, name: null });
  const [addTestData, { ...addTestDataStatus }] = useAddTestDataMutation();
  const handleAddTestData = async () => {
    await addTestData()
      .unwrap()
      .then(() => {
        toast.success("Hentet testdata!");
      })
      .catch((err) => {
        if (err?.data?.title) {
          toast.error(err.data.title);
          return;
        }

        toast.error("Error! Kunne ikke hente testdata!");
        console.error("Adding test data error: ", err);
      });
  };

  const handleDeleteWine = (id: number, name: string) => {
    setWineToDelete({ id, name });
    setIsOpen(true);
  };

  let content;
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

        <LoadingButton
          loading={addTestDataStatus.isLoading}
          onClick={handleAddTestData}
          className="mt-2 h-12 w-full max-w-xs justify-center rounded-md"
          loadingText="Henter testdata..."
          disabled={addTestDataStatus.isLoading || addTestDataStatus.isError}
        >
          <MagicWand size="1.75em" />
          Legg til testdata (18 vin)
        </LoadingButton>
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
        className={`${
          gridView
            ? hideFilter
              ? "grid gap-2 p-4 md:grid-cols-2 lg:grid-cols-3"
              : "grid gap-2 p-4 lg:grid-cols-2"
            : "p-2"
        }`}
      >
        {wine.map((item) => {
          return gridView ? (
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
          );
        })}
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
