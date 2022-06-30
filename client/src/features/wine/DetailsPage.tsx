import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteWineModal from "../../app/components/modals/DeleteWineModal";
import {
  PencilLine,
  Trash,
  Link as LinkIcon,
  CalendarBlank,
} from "phosphor-react";
import WineDetails from "./details/WineDetails";
import WineImageZoom from "./details/WineImageZoom";
import { formatDate } from "../../app/util/format";
import Spinner from "../../app/components/loading/Spinner";
import { vinmonopoletLink } from "../../app/util/vinmonopolet";
import ConsumedModal from "../../app/components/modals/ConsumedModal";
import { InfoBox } from "../../app/components/InfoBox";

const DetailsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConsumedModalOpen, setIsConsumedModalOpen] = useState(false);
  const { wine, id, status } = useFetchSingleWine();

  if (status === "loading") return <Spinner text="Laster vin..." />;
  if (!wine) return <div>vinen eksisterer ikke!</div>;

  return (
    <>
      <div>
        <div className="flex flex-row mb-4 gap-x-2 items-center">
          <div className={`flag f32 ${wine.countryId}`}></div>
          <h2 className="md:text-4xl text-3xl font-bold text-wine-500 dark:text-wine-400">
            {wine.name}
          </h2>
        </div>
        <div className="my-4 pb-4 gap-y-4 border-b dark:border-gray-700 flex sm:flex-row flex-col sm:items-center sm:justify-between">
          <div className="flex flex-row gap-y-2">
            <Link
              className="btn-white rounded-full rounded-r-none justify-center w-auto flex items-center gap-x-2"
              to="update"
            >
              <PencilLine
                size="1.25rem"
                weight="duotone"
                className="text-slate-700 dark:text-slate-400"
              />
              Rediger
            </Link>
            <button
              onClick={() => setIsConsumedModalOpen(true)}
              className="btn-white rounded-none border-l-0 w-auto justify-center flex items-center gap-x-2"
            >
              <CalendarBlank
                size="1.25rem"
                weight="duotone"
                className="text-slate-700 dark:text-slate-400"
              />
              Drukket
            </button>
            {wine.productId && (
              <a
                className="btn-white rounded-none border-l-0 w-auto justify-center flex items-center gap-x-2"
                href={vinmonopoletLink(wine.productId)}
                target="_blank"
                rel="noreferrer"
              >
                <LinkIcon
                  size="1.25rem"
                  weight="duotone"
                  className="text-slate-700 dark:text-slate-400"
                />
                Link
              </a>
            )}
            <button
              onClick={() => setIsOpen(true)}
              className="btn-white rounded-full border-l-0 rounded-l-none justify-center w-auto flex items-center gap-x-2"
            >
              <Trash
                size="1.25rem"
                weight="duotone"
                className="text-wine-500 dark:text-wine-300"
              />
              Slett
            </button>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-400">
            <p>Dato opprettet: {formatDate(new Date(wine.createdAt))}</p>
            <p>
              Sist endret:{" "}
              {wine.updatedAt
                ? formatDate(new Date(wine.updatedAt))
                : "Ingen endring"}
            </p>
          </div>
        </div>
        {!wine.userDetails.quantity && (
          <InfoBox message="Du har ikke vinen på lager." />
        )}

        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-4 md:gap-y-0 gap-y-4 ">
          <div className="col-span-2 space-y-4">
            <WineDetails wine={wine} />
          </div>

          <div className="pl-0 md:pl-4 relative md:row-start-auto md:border-b-0 row-start-1 border-b pb-4">
            <WineImageZoom
              productId={wine.productId}
              pictureUrl={wine.pictureUrl}
              imageByUser={wine.imageByUser}
            />
          </div>
        </div>
      </div>
      <ConsumedModal
        wineId={wine.wineId}
        isOpen={isConsumedModalOpen}
        quantity={wine.userDetails.quantity}
        setIsOpen={setIsConsumedModalOpen}
      />
      <DeleteWineModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        shouldNavigate
        wineToDelete={{ id: id ? parseInt(id) : null, name: wine.name }}
      />
    </>
  );
};

export default DetailsPage;
