import placeholderImg from "../../app/assets/bottle.png";
import { formatDate } from "../../app/util/format";
import { useAppSelector } from "../../app/store/configureStore";
import WineListItem from "../../app/components/wine/WineListItem";

const History = () => {
  const { lastPurchased } = useAppSelector((state) => state.statistics);

  return (
    <div>
      {!!lastPurchased?.length && (
        <div className="p-4 mt-4 bg-slate-50 space-y-2 rounded-lg">
          {lastPurchased.map((wine) => (
            <WineListItem
              key={wine.wineId}
              pictureUrl={wine.pictureUrl || placeholderImg}
              name={wine.name}
              to={`/inventory/${wine.wineId}`}
            >
              <div className="text-sm text-gray-800">
                {formatDate(new Date(wine.date))}
              </div>
            </WineListItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
