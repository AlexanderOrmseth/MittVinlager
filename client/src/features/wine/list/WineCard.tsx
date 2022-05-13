import { Coins, Info, MapTrifold, Percent } from "phosphor-react";
import { Link } from "react-router-dom";
import { Wine } from "../../../app/models/wine";
import placeholderImg from "../../../app/assets/bottle.png";

interface Props {
  wine: Wine;
}
const WineCard = ({ wine }: Props) => {
  console.log(wine);
  return (
    <Link
      to={`${wine.wineId}`}
      className="p-6 bg-white flex flex-row gap-x-6 items-center border hover:border-slate-300 hover:shadow-lg shadow-xxs transition-all rounded  appearance-none focus:bg-white focus:ring-4 focus:ring-wine-300 focus:ring-opacity-50 outline-none"
    >
      <img
        className="max-h-40"
        src={`${
          wine.productId
            ? "https://bilder.vinmonopolet.no/cache/160x160-0/" +
              wine.productId +
              "-1.jpg"
            : placeholderImg
        }`}
        alt="Bilde av en vin"
      />
      <div className="flex-1">
        <header className="mb-2">
          <div className="flex flex-row items-center flex-wrap gap-2">
            <div className={`f32 flag no`}></div>
            <h4 className="font-medium text-lg text-gray-900">{wine.name}</h4>
          </div>
          <div className="flex items-center text-sm text-slate-500 flex-row gap-2">
            <div>{wine.type}</div>
            {wine.year > 0 && <div>{wine.year}</div>}
            {wine.volume > 0 && <div>{wine.volume * 100} cl</div>}
          </div>
        </header>

        <ul className="flex flex-row items-center flex-wrap gap-2">
          <li>
            <MapTrifold size="1.25rem" weight="duotone" color="#64748b" />
          </li>
          {wine.country && <li className="font-medium">{wine.country}</li>}
          {wine.region && <li>{wine.region}</li>}
          {wine.subRegion && <li>{wine.subRegion}</li>}
        </ul>

        <div className="flex items-center flex-row gap-2">
          <Percent size="1.25rem" weight="duotone" color="#64748b" />

          {wine.alcoholContent >= 0 && <div>{wine.alcoholContent} %</div>}
        </div>

        {wine.price > 0 && (
          <div className="flex items-center flex-row gap-2">
            <Coins size="1.25rem" weight="duotone" color="#64748b" />
            {wine.price} kr
          </div>
        )}
      </div>
    </Link>
  );
};

export default WineCard;
