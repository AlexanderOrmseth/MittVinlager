import { useAppSelector } from "../../app/store/configureStore";
import WineListItem from "../../app/components/wine/WineListItem";
import { InfoBox } from "../../app/components/InfoBox";
import Time from "../../app/components/Time";

const History = () => {
  const { lastPurchased } = useAppSelector((state) => state.statistics);

  if (!lastPurchased || lastPurchased.length === 0)
    return (
      <InfoBox message="Ingen data å vise, du kan registrere en kjøpsdato når du legger til en vin." />
    );

  return (
    <div className="p-4 mt-4 bg-slate-50 dark:bg-gray-800/40 space-y-2 rounded-lg">
      {lastPurchased.map((wine) => (
        <WineListItem
          key={wine.wineId}
          pictureUrl={wine.pictureUrl}
          name={wine.name}
          to={`/inventory/${wine.wineId}`}
        >
          <div className="text-sm text-gray-800 space-x-1 dark:text-gray-200">
            <span className="font-medium">Dato kjøpt:</span>
            <Time date={wine.date} />
          </div>
        </WineListItem>
      ))}
    </div>
  );
};

export default History;
