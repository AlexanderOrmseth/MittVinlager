import WineListItem from "../../../app/components/wine/WineListItem";
import { InfoBox } from "../../../app/components/InfoBox";
import Time from "../../../app/components/Time";
import { LastPurchased } from "../../../app/models/statistics";

interface Props {
  lastPurchased: LastPurchased[];
}

const PurchaseHistory = ({ lastPurchased }: Props) => {
  if (!lastPurchased || lastPurchased.length === 0)
    return (
      <InfoBox message="Ingen data å vise, du kan registrere en kjøpsdato når du legger til en vin." />
    );

  return (
    <ul className="block-less-muted mt-4 space-y-2 rounded-lg p-4">
      {lastPurchased.map((wine) => (
        <WineListItem
          key={wine.wineId}
          pictureUrl={wine.pictureUrl}
          name={wine.name}
          to={`/inventory/${wine.wineId}`}
        >
          <div className="space-x-1 text-sm text-gray-800 dark:text-gray-200">
            <span className="font-medium">Dato kjøpt:</span>
            <Time date={wine.date} />
          </div>
        </WineListItem>
      ))}
    </ul>
  );
};

export default PurchaseHistory;
