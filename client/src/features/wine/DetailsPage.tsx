import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";
import placeholderImg from "../../app/assets/bottle.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteWineModal from "../../app/components/modals/DeleteWineModal";
import { PencilLine, Trash, Link as LinkIcon } from "phosphor-react";
import DescriptionListItem from "../../app/components/DescriptionListItem";
import { formatPrice } from "../../app/util/format";

const DetailsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { wine, id, status } = useFetchSingleWine();

  if (status === "loading") return <div>Laster inn vin!</div>;
  if (!wine) return <div>vinen eksisterer ikke!</div>;

  return (
    <>
      <div>
        <div className="flex flex-row gap-x-2 items-center my-4">
          <div className={`flag f32 ${wine.countryId}`}></div>
          <h2 className="text-3xl font-medium">{wine.name}</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <dl className="border col-span-2 rounded-lg">
            <DescriptionListItem dt="Type" dd={wine.type} />
            <DescriptionListItem dt="Pris" dd={formatPrice(wine.price)} />
            <DescriptionListItem dt="Årgang" dd={wine.year || ""} />
            <DescriptionListItem dt="Volum" dd={wine.volume || ""} />
            <DescriptionListItem
              dt="Alkoholinnhold"
              dd={wine.alcoholContent || ""}
            />
            <DescriptionListItem dt="Land" dd={wine.country || ""} />
            <DescriptionListItem
              dt="Region, distrikt"
              dd={`${wine.region}, ${wine.subRegion}`}
            />
            <DescriptionListItem
              dt="Produsent"
              dd={wine.manufacturerName || ""}
            />

            <DescriptionListItem dt="Råstoff" dd={wine.grapes || ""} />

            <DescriptionListItem dt="Farge" dd={wine.colour || ""} />
            <DescriptionListItem dt="Duft" dd={wine.odour || ""} />
            <DescriptionListItem dt="Smak" dd={wine.taste || ""} />
          </dl>
          <div className="p-2 flex flex-col justify-center border rounded-lg">
            <img
              className="w-44 mx-auto"
              src={`${wine.pictureUrl ? wine.pictureUrl : placeholderImg}`}
              alt="Bilde av en vin"
            />
          </div>
        </div>
        <div className="flex my-4 flex-row gap-x-2">
          <Link
            className="btn-white w-auto flex items-center gap-x-2"
            to="update"
          >
            <PencilLine
              size="1.5rem"
              weight="duotone"
              className="text-slate-600"
            />
            Rediger vin
          </Link>
          {wine.productId && (
            <a
              className="btn-white w-auto flex items-center gap-x-2"
              href={`https://www.vinmonopolet.no/Producenter/Larsen/Larsen-V-S-O-P-/p/${wine.productId}`}
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon size="1.5rem" weight="duotone" />
              Vinmonopolet link
            </a>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="btn-white w-auto flex items-center gap-x-2"
          >
            <Trash size="1.5rem" weight="duotone" className="text-wine-500" />
            Slett vin
          </button>
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
