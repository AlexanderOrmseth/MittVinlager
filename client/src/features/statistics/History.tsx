import { formatDate } from "../../app/util/format";
import { useAppSelector } from "../../app/store/configureStore";
import WineListItem from "../../app/components/wine/WineListItem";
import Spinner from "../../app/components/loading/Spinner";

const History = () => {
  const { lastPurchased, status } = useAppSelector((state) => state.statistics);

  if (status === "loading") return <Spinner text="Laster statistikk" />;

  if (status === "rejected")
    return <div>Error, kunne ikke hente statistikk.</div>;

  if (!lastPurchased || lastPurchased.length === 0)
    return <div>Ingen data å vise.</div>;

  return (
    <div>
      {!!lastPurchased?.length && (
        <div className="p-4 mt-4 bg-slate-50 space-y-2 rounded-lg">
          {lastPurchased.map((wine) => (
            <WineListItem
              key={wine.wineId}
              pictureUrl={wine.pictureUrl}
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
