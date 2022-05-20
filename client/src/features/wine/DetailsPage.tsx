import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteWineModal from "../../app/components/modals/DeleteWineModal";
import { PencilLine, Trash, Link as LinkIcon } from "phosphor-react";
import WineDetails from "./details/WineDetails";
import WineImageZoom from "./details/WineImageZoom";
import { formatDate } from "../../app/util/format";

const DetailsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { wine, id, status } = useFetchSingleWine();

  if (status === "loading") return <div>Laster inn vin!</div>;
  if (!wine) return <div>vinen eksisterer ikke!</div>;

  return (
    <>
      <div className="my-4">
        <div className="flex flex-row gap-x-2 justify-center items-center rounded-t-lg pl-4 lg:py-6 py-4">
          <div className={`flag f32 ${wine.countryId}`}></div>
          <h2 className="lg:text-3xl md:text-2xl text-xl text-wine-500 font-medium">
            {wine.name}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 border-t gap-4">
          <div className="col-span-2 pt-4 space-y-4">
            <WineDetails wine={wine} />
          </div>

          <div className="border-l pl-4 pt-4 space-y-4">
            <div className="flex mb-4 lg:flex-row flex-col gap-2">
              <Link
                className="btn-white flex-1 justify-center w-auto flex items-center gap-x-2"
                to="update"
              >
                <PencilLine
                  size="1.5rem"
                  weight="duotone"
                  className="text-slate-600"
                />
                Rediger
              </Link>
              {wine.productId && (
                <a
                  className="btn-white w-auto justify-center flex-1 flex items-center gap-x-2"
                  href={`https://www.vinmonopolet.no/Producenter/Larsen/Larsen-V-S-O-P-/p/${wine.productId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon size="1.5rem" weight="duotone" />
                  Link
                </a>
              )}
              <button
                onClick={() => setIsOpen(true)}
                className="btn-white flex-1 justify-center w-auto flex items-center gap-x-2"
              >
                <Trash
                  size="1.5rem"
                  weight="duotone"
                  className="text-wine-500"
                />
                Slett
              </button>
            </div>
            <div className="text-sm pt-4 border-t">
              <p>Dato opprettet: {formatDate(new Date(wine.createdAt))}</p>
              <p>
                Sist endret:{" "}
                {wine.updatedAt ? formatDate(new Date(wine.updatedAt)) : ""}
              </p>
            </div>
            <div className="p-2 pt-4 border-t">
              <WineImageZoom
                productId={wine.productId}
                pictureUrl={wine.pictureUrl || ""}
              />
            </div>
          </div>
        </div>
      </div>
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
