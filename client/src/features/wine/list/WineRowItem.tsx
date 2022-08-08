import { HeartStraight, Pen, Trash } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { Wine } from "../../../app/models/wine";
import { formatPrice } from "../../../app/util/format";
import Stars from "../../../app/components/Stars";
import Score from "../../../app/components/Score";
import { placeholder } from "../../../app/util/vinmonopolet";
import Time from "../../../app/components/Time";

interface Props {
  wine: Wine;
  handleDeleteWine: (id: number, name: string) => void;
}

const WineRowItem = ({ wine, handleDeleteWine }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onDoubleClick={() => navigate(`${wine.wineId}`)}
      className="group border-b-none dark:border-gray-950 dark:bg-gray-925/80 relative flex items-center gap-x-1 border-x border-t bg-white p-2 text-sm first:rounded-t last:rounded-b last:border-b even:bg-white/20 dark:even:bg-gray-900"
    >
      <img
        className="pointer-events-none h-20 w-12 select-none rounded object-scale-down"
        src={wine.pictureUrl || placeholder}
        alt="Bilde av en vin"
      />
      <div className="flex-1">
        <div className="font-medium leading-4 ">
          <Link className="link" to={`${wine.wineId}`}>
            {wine.name}
          </Link>
        </div>
        <div className="comma my-1 flex flex-row flex-wrap items-center gap-y-1 text-gray-500 dark:text-gray-300">
          {wine.country && (
            <div className="flex flex-row items-center">
              <span
                className={`f16 flag mr-1 ${wine.countryId && wine.countryId}`}
              />
              {wine.country}
            </div>
          )}

          <div>{wine.type}</div>
          {wine.year && wine.year > 0 && <div>{wine.year}</div>}

          <div>{formatPrice(wine.price)}</div>
          <Time date={wine.createdAt} />
          <div
            className={`${
              wine.userDetails.quantity === 0
                ? "border-wine-500 dark:border-wine-400 dark:text-wine-300 text-wine-400 border-b-2"
                : ""
            }`}
          >
            antall: {wine.userDetails.quantity}
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1">
          {wine.userDetails.score && (
            <Score value={wine.userDetails.score} hideDefinition size={6} />
          )}
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
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 opacity-40 transition-opacity group-hover:opacity-100 sm:flex-row">
        <Link
          to={`${wine.wineId}/update`}
          className="btn-white p-2 shadow-none"
        >
          <Pen size="1.2rem" />
        </Link>
        <button
          onClick={() => handleDeleteWine(wine.wineId, wine.name)}
          className="btn-white p-2 shadow-none"
        >
          <Trash size="1.2rem" />
        </button>
      </div>
    </div>
  );
};

export default WineRowItem;
