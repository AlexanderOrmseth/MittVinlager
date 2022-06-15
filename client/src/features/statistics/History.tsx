import { formatDate } from "../../app/util/format";
import { useAppSelector } from "../../app/store/configureStore";
import WineListItem from "../../app/components/wine/WineListItem";
import Spinner from "../../app/components/loading/Spinner";
import { InfoBox } from "../../app/components/InfoBox";
import ErrorBox from "../../app/components/ErrorBox";

const History = () => {
  const { lastPurchased, status } = useAppSelector((state) => state.statistics);

  if (status === "loading") return <Spinner text="Laster statistikk..." />;

  if (status === "rejected")
    return <ErrorBox message="kunne ikke hente statistikk." />;

  if (!lastPurchased || lastPurchased.length === 0)
    return (
      <InfoBox message="Ingen data å vise, du kan registrere en kjøpsdato når du legger til en vin." />
    );

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
