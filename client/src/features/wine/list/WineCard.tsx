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
      className="group hover:bg-slate-25 dark:bg-gray-925 dark:hover:bg-gray-925/70 focus-primary relative block rounded border bg-white p-4 hover:border-gray-300 dark:border-gray-800"
    >
      {wine.userDetails.quantity === 0 && (
        <div className="bg-wine-200/5 pointer-events-none absolute top-0 left-0 z-[1] flex h-full w-full items-center justify-center rounded">
          <div className="bg-wine-500/70 border-wine-400 rounded p-2 text-sm font-medium text-white backdrop-blur-sm transition-opacity group-hover:opacity-20">
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
          className="h-10 w-12 rounded-none rounded-tr border-0 shadow-none "
          icon={<DotsThree size="1.5rem" />}
        />
      </div>

      <div className="flex h-full flex-col gap-2 text-center">
        <h4 className="text-blue-wine-500 dark:text-blue-wine-25 px-9 font-bold leading-4">
          {wine.name}
        </h4>

        <div className="text-muted comma flex flex-row flex-wrap items-center justify-center text-sm">
          <div>{wine.type}</div>
          {wine.year && wine.year > 0 && <div>{wine.year}</div>}
          {wine.volume && wine.volume > 0 && (
            <div>{formatVolume(wine.volume)}</div>
          )}
          {wine.alcoholContent && (
            <div>{formatAlcoholContent(wine.alcoholContent)}</div>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-y-2">
          <img
            className="pointer-events-none h-28 w-28 select-none rounded object-scale-down md:h-28 md:w-28 lg:h-40 lg:w-32"
            src={wine.pictureUrl || placeholder}
            alt="Bilde av en vin"
          />
          {(!!wine.userDetails.userRating ||
            wine.userDetails.favorite ||
            wine.userDetails.score) && (
            <div className="flex flex-row flex-wrap items-center gap-4 text-sm">
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
          <div className="comma i-flex-row text-muted flex-wrap gap-x-0 text-sm">
            {wine.country && (
              <>
                <span
                  className={`f16 flag mr-1 ${
                    wine.countryId && wine.countryId
                  }`}
                />
                <span className="text-less-muted font-medium">
                  {wine.country}
                </span>
              </>
            )}
            {wine.region && <span>{wine.region}</span>}
            {wine.subRegion && <span>{wine.subRegion}</span>}
          </div>
        </div>
        <div className="text-less-muted flex flex-row flex-wrap items-center justify-around gap-x-4 gap-y-2 text-sm">
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
