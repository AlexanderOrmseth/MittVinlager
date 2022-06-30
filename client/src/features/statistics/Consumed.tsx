import { formatDate } from "../../app/util/format";
import { useAppSelector } from "../../app/store/configureStore";
import WineListItem from "../../app/components/wine/WineListItem";
import { InfoBox } from "../../app/components/InfoBox";

const Consumed = () => {
  const { lastConsumed } = useAppSelector((state) => state.statistics);
  if (!lastConsumed || lastConsumed.length === 0)
    return (
      <InfoBox message="Ingen data å vise, du kan registrere en drukket-dato på infosiden til en vin." />
    );

  return (
    <div className="p-4 mt-4 bg-slate-50 dark:bg-gray-800/40 space-y-2 rounded-lg">
      {lastConsumed.map((item) => (
        <WineListItem
          key={item.id}
          pictureUrl={item.pictureUrl}
          name={item.name}
          to={`/inventory/${item.wineId}`}
        >
          <div className="text-sm text-gray-800 dark:text-gray-200">
            <span className="font-medium">Dato drukket:</span>{" "}
            {formatDate(new Date(item.date))}
          </div>
        </WineListItem>
      ))}
    </div>
  );
};

export default Consumed;
