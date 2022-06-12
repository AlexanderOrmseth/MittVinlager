import { HeartStraight, Pen, Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import { Wine } from "../../../app/models/wine";
import { formatDate, formatPrice } from "../../../app/util/format";
import Stars from "../../../app/components/Stars";
import Score from "../../../app/components/Score";
import { placeholder } from "../../../app/util/vinmonopolet";

interface Props {
  wine: Wine;
  handleDeleteWine: (id: number, name: string) => void;
}
const WineRowItem = ({ wine, handleDeleteWine }: Props) => {
  return (
    <div className="px-2 py-1 text-sm shadow hover:shadow-sm rounded items-center bg-white hover:bg-slate-25 flex gap-x-1">
      <div>
        <img
          className="object-scale-down pointer-events-none select-none h-20 w-16 rounded"
          src={wine.pictureUrl || placeholder}
          alt="Bilde av en vin"
        />
      </div>
      <div className="flex-1">
        <div className="font-medium leading-4 ">
          <Link className="link" to={`${wine.wineId}`}>
            {wine.name}
          </Link>
        </div>
        <div className="flex text-gray-500 my-1 flex-row space-x-2 flex-wrap items-center comma">
          <div className="flex items-center">
            <span
              className={`f16 mr-1 flag ${wine.countryId && wine.countryId}`}
            />
            {wine.country}
          </div>
          <div>{wine.type}</div>
          {wine.year && wine.year > 0 && <div>{wine.year}</div>}

          <div>{formatPrice(wine.price)}</div>
          <div>{formatDate(new Date(wine.createdAt))}</div>
          <div>antall: {wine.userDetails.quantity}</div>
        </div>
        <div className="flex items-center flex-row flex-wrap gap-x-3 gap-y-1">
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
              className="text-wine-500"
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        <Link
          to={`${wine.wineId}/update`}
          className="btn-white shadow-none p-2"
        >
          <Pen size="1.2rem" />
        </Link>
        <button
          onClick={() => handleDeleteWine(wine.wineId, wine.name)}
          className="btn-white shadow-none p-2"
        >
          <Trash size="1.2rem" />
        </button>
      </div>
    </div>
  );
};

export default WineRowItem;
