import WineListItem from "../../../app/components/wine/WineListItem";
import { InfoBox } from "../../../app/components/InfoBox";
import Time from "../../../app/components/Time";
import { LastConsumed } from "../../../app/models/consumed";

interface Props {
  lastConsumed: LastConsumed[];
}

const ConsumptionHistory = ({ lastConsumed }: Props) => {
  if (!lastConsumed || lastConsumed.length === 0)
    return (
      <InfoBox message="Ingen data å vise, du kan registrere en drukket-dato på infosiden til en vin." />
    );

  return (
    <ul className="p-4 mt-4 bg-slate-50 dark:bg-gray-950 space-y-2 rounded-lg">
      {lastConsumed.map((item) => (
        <WineListItem
          key={item.id}
          pictureUrl={item.pictureUrl}
          name={item.name}
          to={`/inventory/${item.wineId}`}
        >
          <div className="text-sm text-gray-800 space-x-1 dark:text-gray-200">
            <span className="font-medium">Dato drukket:</span>
            <Time date={item.date} />
          </div>
        </WineListItem>
      ))}
    </ul>
  );
};

export default ConsumptionHistory;
