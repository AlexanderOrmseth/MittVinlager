import {
  BeerBottle,
  CalendarBlank,
  Coins,
  DotsThree,
  HeartStraight,
  Pen,
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
import Score from "../../../app/components/Score";

interface Props {
  wine: Wine;
  handleDeleteWine: (id: number, name: string) => void;
}
const WineCard = ({ wine, handleDeleteWine }: Props) => {
  const navigate = useNavigate();
  return (
    <Link
      to={`${wine.wineId}`}
      className="relative h-full p-4 block shadow hover:shadow-sm rounded bg-white hover:bg-slate-25 focus-primary"
    >
      <div
        className="absolute top-0 right-0"
        onClick={(e) => {
          // prevent link click
          e.stopPropagation();
          e.preventDefault();
        }}
      >
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
          className="border-0 rounded-none rounded-tr-lg shadow-none w-12 h-10 "
          icon={<DotsThree size="1.5rem" />}
        />
      </div>

      <div className="flex h-full flex-col text-center gap-2">
        <h4 className="font-medium leading-4 px-8 text-blue-wine-500">
          {wine.name}
        </h4>

        <div className="flex text-sm justify-center flex-wrap items-center text-gray-500 flex-row gap-2 comma">
          <div>{wine.type}</div>
          {wine.year && wine.year > 0 && <div>{wine.year}</div>}
          {wine.volume && wine.volume > 0 && (
            <div>{formatVolume(wine.volume)}</div>
          )}
          {wine.alcoholContent && (
            <div>{formatAlcoholContent(wine.alcoholContent)}</div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center flex-col gap-y-2">
          <img
            className="object-scale-down pointer-events-none select-none lg:h-40 lg:w-32 rounded md:h-28 md:w-28 w-28 h-28"
            src={`${wine.pictureUrl ? wine.pictureUrl : placeholderImg}`}
            alt="Bilde av en vin"
          />
          {(!!wine.userDetails.userRating ||
            wine.userDetails.favorite ||
            wine.userDetails.score) && (
            <div className="flex flex-row text-sm items-center gap-4">
              {!!wine.userDetails.userRating && (
                <Stars stars={wine.userDetails.userRating} size="1.25rem" />
              )}

              {wine.userDetails.favorite && (
                <HeartStraight
                  size="1.25rem"
                  weight="duotone"
                  className="text-wine-500"
                />
              )}

              {wine.userDetails.score && (
                <Score value={wine.userDetails.score} hideDefinition size={6} />
              )}
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <div className="comma flex flex-row gap-x-2 text-sm text-gray-500 flex-wrap items-center">
            <span className={`f16 flag ${wine.countryId && wine.countryId}`} />
            {wine.country && (
              <span className="font-medium text-gray-700">{wine.country}</span>
            )}
            {wine.region && <span>{wine.region}</span>}
            {wine.subRegion && <span>{wine.subRegion}</span>}
          </div>
        </div>
        <div className="flex text-sm items-center text-gray-700 justify-around flex-wrap flex-row gap-x-4 gap-y-2">
          <div className="flex items-center flex-row gap-2">
            <BeerBottle
              size="1.25rem"
              weight="duotone"
              className="text-slate-500"
            />
            {wine.userDetails.quantity}
          </div>
          {!!wine.price && (
            <div className="flex items-center flex-row gap-2">
              <Coins
                size="1.25rem"
                weight="duotone"
                className="text-slate-500"
              />
              {formatPrice(wine.price)}
            </div>
          )}

          {wine.createdAt && (
            <div className="flex text-sm items-center flex-row gap-2">
              <CalendarBlank
                size="1.25rem"
                weight="duotone"
                className="text-slate-500"
              />
              {formatDate(new Date(wine.createdAt))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default WineCard;
