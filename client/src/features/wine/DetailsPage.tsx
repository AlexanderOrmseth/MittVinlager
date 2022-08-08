import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteWineModal from "../../app/components/modals/DeleteWineModal";
import {
  CalendarBlank,
  Link as LinkIcon,
  PencilLine,
  Trash,
} from "phosphor-react";
import WineDetail from "./details/WineDetail";
import WineImageZoom from "./details/WineImageZoom";
import Spinner from "../../app/components/loading/Spinner";
import { vinmonopoletLink } from "../../app/util/vinmonopolet";
import ConsumedModal from "../../app/components/modals/ConsumedModal";
import { InfoBox } from "../../app/components/InfoBox";
import Time from "../../app/components/Time";
import ErrorBox from "../../app/components/ErrorBox";
import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";
import Title from "../../app/layout/Title";
import NotFound from "../../app/layout/NotFound";

const DetailsPage = () => {
  const { wine, id, status } = useFetchSingleWine();

  // modal state
  const [isOpen, setIsOpen] = useState(false);
  const [isConsumedModalOpen, setIsConsumedModalOpen] = useState(false);

  if (!id) return <NotFound />;
  else if (status.isLoading) return <Spinner text="Laster..." />;
  else if (status.isError) {
    return <ErrorBox message={`Kunne ikke finne vinen med id: ${id}`} />;
  } else if (status.isSuccess && wine)
    return (
      <>
        <div>
          <Title
            title={wine.name}
            border
            node={<div className={`flag f32 ${wine.countryId}`} />}
            highlighted
          />

          <div className="my-4 flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-row gap-y-2">
              <Link
                className="btn-white xs:gap-x-2 xs:px-4 flex w-auto items-center justify-center gap-x-0.5 rounded-full rounded-r-none px-2.5"
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
                className="btn-white xs:gap-x-2 xs:px-4 flex w-auto items-center justify-center gap-x-0.5 rounded-none border-l-0 px-2.5"
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
                  className="btn-white xs:gap-x-2 xs:px-4 flex w-auto items-center justify-center gap-x-0.5 rounded-none border-l-0 px-2.5"
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
                className="btn-white xs:gap-x-2 xs:px-4 flex w-auto items-center justify-center gap-x-0.5 rounded-full rounded-l-none border-l-0 px-2.5"
              >
                <Trash
                  size="1.25rem"
                  weight="duotone"
                  className="text-wine-500 dark:text-wine-300"
                />
                Slett
              </button>
            </div>

            <div className="text-muted text-sm">
              <p>
                Dato opprettet: <Time date={wine.createdAt} />
              </p>
              <p>
                Sist endret:{" "}
                <Time date={wine.updatedAt} fallBackText="Ingen endring" />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4 md:gap-y-0 ">
            <div className="col-span-2">
              <WineDetail wine={wine} />
            </div>

            <div className="relative row-start-1 pl-0 md:row-start-auto">
              {!wine.userDetails.quantity && (
                <InfoBox
                  className="mt-0"
                  message="Du har ikke vinen på lager."
                />
              )}
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
          wineToDelete={{ id, name: wine.name }}
        />
      </>
    );

  return null;
};

export default DetailsPage;
