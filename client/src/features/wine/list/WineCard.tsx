import {
  BeerBottle,
  CalendarBlank,
  Coins,
  DotsThree,
  HeartStraight,
  MapPinLine,
  Pen,
  Star,
  Trash,
} from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { Wine } from "../../../app/models/wine";
import placeholderImg from "../../../app/assets/bottle.png";
import DropDownMenu from "../../../app/components/DropDownMenu";
import {
  formatAlcoholContent,
  formatDate,
  formatPrice,
  formatVolume,
} from "../../../app/util/format";
import Stars from "../../../app/components/Stars";

interface Props {
  wine: Wine;
  handleDeleteWine: (id: number, name: string) => void;
}
const WineCard = ({ wine, handleDeleteWine }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className={`border bg-white hover:border-slate-300 hover:shadow-lg shadow-xxs transition-all rounded ${
        wine.userDetails.quantity === 0 ? "opacity-50 " : ""
      }`}
    >
      <header className="flex items-center justify-between border-b">
        <Link
          to={`${wine.wineId}`}
          className="flex flex-1 flex-row items-center gap-2 px-2 py-1  hover:bg-slate-50 text-green-wine-500 hover:underline"
        >
          <div className={`f32 flag ${wine.countryId && wine.countryId}`}></div>
          <h4 className="font-medium flex-1 leading-4">{wine.name}</h4>
        </Link>
        <DropDownMenu
          buttons={[
            {
              text: "Rediger",
              icon: <Pen size="1.2rem" />,
              fnc: () => navigate(`/inventory/${wine.wineId}/update`),
            },
            {
              text: "Slett",
              icon: <Trash size="1.2rem" />,
              divide: true,
              fnc: () => handleDeleteWine(wine.wineId, wine.name),
            },
          ]}
          text=""
          fullHeight
          className="border-0 shadow-none border-l rounded-none h-full rounded-tr px-2"
          icon={<DotsThree size="1.5rem" />}
        />
      </header>
      <div className="p-4 flex flex-row md:gap-x-4 gap-x-2 items-center text-sm">
        <img
          className="object-scale-down lg:h-32 lg:w-32 md:h-28 md:w-28 w-24 h-24"
          src={`${wine.pictureUrl ? wine.pictureUrl : placeholderImg}`}
          alt="Bilde av en vin"
        />
        <div className="flex-1">
          <div className="flex flex-wrap mb-2.5 items-center text-slate-500 flex-row gap-2 comma">
            <div>{wine.type}</div>
            {wine.year && wine.year > 0 && <div>{wine.year}</div>}
            {wine.volume && wine.volume > 0 && (
              <div>{formatVolume(wine.volume)}</div>
            )}
            {wine.alcoholContent && (
              <div>{formatAlcoholContent(wine.alcoholContent)}</div>
            )}
          </div>

          <ul className="space-y-0.5">
            {!!wine.userDetails.userRating && (
              <li className="mb-1">
                <Stars stars={wine.userDetails.userRating} size="1.25rem" />
              </li>
            )}
            <div className="flex flex-row items-center gap-2">
              <div>
                <MapPinLine
                  size="1.25rem"
                  weight="duotone"
                  className="text-slate-500"
                />
              </div>
              <div className="comma flex flex-row gap-x-2 flex-wrap items-center">
                {wine.country && (
                  <span className="font-medium">{wine.country}</span>
                )}
                {wine.region && <span>{wine.region}</span>}
                {wine.subRegion && <span>{wine.subRegion}</span>}
              </div>
            </div>

            {wine.userDetails.favorite && (
              <li className="flex items-center flex-row gap-2">
                <HeartStraight
                  size="1.25rem"
                  weight="duotone"
                  className="text-slate-500"
                />
                <div>favoritt</div>
              </li>
            )}

            {!!wine.price && (
              <li className="flex items-center flex-row gap-2">
                <Coins
                  size="1.25rem"
                  weight="duotone"
                  className="text-slate-500"
                />
                {formatPrice(wine.price)}
              </li>
            )}

            {wine.userDetails.quantity >= 0 && (
              <li className="flex items-center flex-row gap-2">
                <BeerBottle
                  size="1.25rem"
                  weight="duotone"
                  className="text-slate-500"
                />
                {wine.userDetails.quantity}
              </li>
            )}

            {wine.createdAt && (
              <li className="flex items-center flex-row gap-2">
                <CalendarBlank
                  size="1.25rem"
                  weight="duotone"
                  className="text-slate-500"
                />
                {formatDate(new Date(wine.createdAt))}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WineCard;
