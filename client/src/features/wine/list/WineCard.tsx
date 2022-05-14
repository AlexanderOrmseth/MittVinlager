import {
  Coins,
  DotsThree,
  HeartStraight,
  Info,
  MapTrifold,
  Moon,
  Pen,
  Percent,
  SignOut,
  Star,
  Trash,
  User,
} from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { Wine } from "../../../app/models/wine";
import placeholderImg from "../../../app/assets/bottle.png";
import DropDownMenu from "../../../app/components/DropDownMenu";

interface Props {
  wine: Wine;
}
const WineCard = ({ wine }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-white flex flex-row gap-x-6 items-center border hover:border-slate-300 hover:shadow-lg shadow-xxs transition-all rounded  appearance-none focus:bg-white focus:ring-4 focus:ring-wine-300 focus:ring-opacity-50 outline-none">
      <img
        className="max-h-32"
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
          <Link
            to={`${wine.wineId}`}
            className="flex flex-row items-center gap-2"
          >
            <div className={`f32 flag no`}></div>
            <h4 className="font-medium text-gray-900">{wine.name}</h4>
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
                fnc: () => {
                  console.log("Log out");
                },
              },
            ]}
            text=""
            icon={<DotsThree size="1.2rem" />}
          />
          <div className="flex items-center text-sm text-slate-500 flex-row gap-2">
            <div>{wine.type}</div>
            {wine.year > 0 && <div>{wine.year}</div>}
            {wine.volume > 0 && <div>{wine.volume * 100} cl</div>}
            <div>{wine.alcoholContent || 0}%</div>
          </div>
        </header>
        <ul className="flex text-sm flex-row items-center flex-wrap gap-2">
          <li>
            <MapTrifold size="1.25rem" weight="duotone" color="#64748b" />
          </li>
          {wine.country && <li className="font-medium">{wine.country}</li>}
          {wine.region && <li>{wine.region}</li>}
          {wine.subRegion && <li>{wine.subRegion}</li>}
        </ul>
        {!!wine.userDetails.userRating && (
          <div className="flex text-sm items-center flex-row gap-2">
            <Star size="1.25rem" weight="duotone" color="#64748b" />
            <div>{wine.userDetails.userRating / 2} stjerner</div>
          </div>
        )}
        {wine.userDetails.favorite && (
          <div className="flex text-sm items-center flex-row gap-2">
            <HeartStraight size="1.25rem" weight="duotone" color="#64748b" />
            <div>favoritt</div>
          </div>
        )}

        {!!wine.price && (
          <div className="flex text-sm items-center flex-row gap-2">
            <Coins size="1.25rem" weight="duotone" color="#64748b" />
            {wine.price} kr
          </div>
        )}
        <div className="mt-2">
          <Link
            to={"/inventory/" + wine.wineId}
            className="btn-primary h-auto py-1.5"
          >
            Vis mer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WineCard;
