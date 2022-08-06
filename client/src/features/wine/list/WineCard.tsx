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
import DropDownMenu from "../../../app/components/DropDownMenu";
import {
  formatAlcoholContent,
  formatPrice,
  formatVolume,
} from "../../../app/util/format";
import Stars from "../../../app/components/Stars";
import Score from "../../../app/components/Score";
import { placeholder } from "../../../app/util/vinmonopolet";
import Time from "../../../app/components/Time";

interface Props {
  wine: Wine;
  handleDeleteWine: (id: number, name: string) => void;
}

const WineCard = ({ wine, handleDeleteWine }: Props) => {
  const navigate = useNavigate();
  return (
    <Link
      to={`${wine.wineId}`}
      className="relative h-full p-4 block group shadow hover:shadow-sm rounded bg-white hover:bg-slate-25 dark:bg-gray-925 dark:hover:bg-gray-925/70 focus-primary"
    >
      {wine.userDetails.quantity === 0 && (
        <div
          className="absolute pointer-events-none flex justify-center items-center w-full h-full z-[1] top-0 left-0 bg-wine-200/5 rounded">
          <div
            className="backdrop-blur-sm transition-opacity group-hover:opacity-20 bg-wine-500/70 p-2 text-sm rounded text-white font-medium border-wine-400">
            Ikke på lager
          </div>
        </div>
      )}
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
          className="border-0 rounded-none rounded-tr shadow-none w-12 h-10 "
          icon={<DotsThree size="1.5rem" />}
        />
      </div>

      <div className="flex h-full flex-col text-center gap-2">
        <h4 className="font-bold leading-4 px-9 text-blue-wine-500 dark:text-blue-wine-25">
          {wine.name}
        </h4>

        <div className="flex text-sm justify-center flex-wrap items-center text-muted flex-row gap-2 comma">
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
            src={wine.pictureUrl || placeholder}
            alt="Bilde av en vin"
          />
          {(!!wine.userDetails.userRating ||
            wine.userDetails.favorite ||
            wine.userDetails.score) && (
            <div className="flex flex-row flex-wrap text-sm items-center gap-4">
              {!!wine.userDetails.userRating && (
                <Stars stars={wine.userDetails.userRating} size="1.25rem" />
              )}

              {wine.userDetails.favorite && (
                <HeartStraight
                  size="1.25rem"
                  weight="duotone"
                  className="dark:text-wine-300 text-wine-500"
                />
              )}

              {wine.userDetails.score && (
                <Score value={wine.userDetails.score} hideDefinition size={6} />
              )}
            </div>
          )}
        </div>

        <div className="i-flex-row justify-center">
          <div className="comma i-flex-row text-sm text-muted flex-wrap">
            {wine.country && (
              <>
                <span
                  className={`f16 flag ${wine.countryId && wine.countryId}`}
                />
                <span className="font-medium text-less-muted">
                  {wine.country}
                </span>
              </>
            )}
            {wine.region && <span>{wine.region}</span>}
            {wine.subRegion && <span>{wine.subRegion}</span>}
          </div>
        </div>
        <div className="flex text-sm items-center text-less-muted justify-around flex-wrap flex-row gap-x-4 gap-y-2">
          <div className={`i-flex-row`}>
            <BeerBottle size="1.25rem" weight="duotone" />
            {wine.userDetails.quantity}
          </div>
          {!!wine.price && (
            <div className="i-flex-row">
              <Coins size="1.25rem" weight="duotone" />
              {formatPrice(wine.price)}
            </div>
          )}

          {wine.createdAt && (
            <div className="i-flex-row">
              <CalendarBlank size="1.25rem" weight="duotone" />
              <Time date={wine.createdAt} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default WineCard;
