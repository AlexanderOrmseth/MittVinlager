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
    <div
      className={`border border-slate-200   rounded-lg ${
        wine.userDetails.quantity === 0 ? "opacity-50 " : ""
      }`}
    >
      <Link
        to={`${wine.wineId}`}
        className="relative flex flex-row items-center rounded-t-lg bg-white hover:bg-slate-50 "
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
        <div className="relative p-1">
          {wine.userDetails.favorite && (
            <HeartStraight
              size="1.25rem"
              weight="duotone"
              className="text-wine-500 absolute top-1 left-1"
            />
          )}
          <img
            className="object-scale-down lg:h-32 lg:w-28 rounded md:h-28 md:w-28 w-28 h-28"
            src={`${wine.pictureUrl ? wine.pictureUrl : placeholderImg}`}
            alt="Bilde av en vin"
          />
        </div>
        <div className="flex flex-1 flex-col border-l border-slate-100 gap-2 p-4 ">
          <h4 className="font-medium leading-4 text-green-wine-500">
            {wine.name}
          </h4>
          <div className="flex text-sm flex-wrap items-center text-slate-500 flex-row gap-2 comma">
            <div>{wine.type}</div>
            {wine.year && wine.year > 0 && <div>{wine.year}</div>}
            {wine.volume && wine.volume > 0 && (
              <div>{formatVolume(wine.volume)}</div>
            )}
            {wine.alcoholContent && (
              <div>{formatAlcoholContent(wine.alcoholContent)}</div>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="comma flex flex-row gap-x-2 text-sm text-slate-500 flex-wrap items-center">
              <span
                className={`f32 flag ${wine.countryId && wine.countryId}`}
              ></span>
              {wine.country && (
                <span className="font-medium">{wine.country}</span>
              )}
              {wine.region && <span>{wine.region}</span>}
              {wine.subRegion && <span>{wine.subRegion}</span>}
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 flex flex-row md:gap-x-4 gap-x-2 items-center text-sm">
        <div className="py-4 flex-1 border-t">
          <div className="flex flex-row items-start">
            <ul className="space-y-0.5 flex-1">
              <li className="flex items-center justify-around flex-wrap flex-row gap-x-4 gap-y-2">
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
                  <div className="flex items-center flex-row gap-2">
                    <CalendarBlank
                      size="1.25rem"
                      weight="duotone"
                      className="text-slate-500"
                    />
                    {formatDate(new Date(wine.createdAt))}
                  </div>
                )}

                {!!wine.userDetails.userRating && (
                  <Stars stars={wine.userDetails.userRating} size="1.25rem" />
                )}

                {!!wine.userDetails.userRating && (
                  <Score
                    value={wine.userDetails.score}
                    hideDefinition
                    size={8}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineCard;
