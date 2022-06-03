import { Link } from "react-router-dom";
import placeholderImg from "../../app/assets/bottle.png";
import { formatDate } from "../../app/util/format";
import { useAppSelector } from "../../app/store/configureStore";

const History = () => {
  const { lastPurchased } = useAppSelector((state) => state.statistics);

  return (
    <div>
      {!!lastPurchased?.length && (
        <div className="p-4 mt-4 bg-slate-50 space-y-2 rounded-lg">
          {lastPurchased.map((wine) => (
            <div
              key={wine.wineId}
              className="flex items-center bg-white rounded shadow p-1"
            >
              <img
                className="object-scale-down pointer-events-none select-none rounded w-28 h-28"
                src={wine.pictureUrl || placeholderImg}
                alt={`Bilde av en vin: ${wine.name}`}
              />
              <div className="flex-1 ml-2">
                <Link
                  className="text-green-wine-500 hover:text-green-wine-600 hover:underline font-medium"
                  to={`/inventory/${wine.wineId}`}
                >
                  {wine.name}
                </Link>
                <div className="text-sm text-gray-800">
                  {formatDate(new Date(wine.date))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
