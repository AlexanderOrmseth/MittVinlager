import { Wine } from "../../../app/models/wine";
import WineCard from "./WineCard";

interface Props {
  wineList: Wine[] | [];
}
const WineList = ({ wineList }: Props) => {
  return (
    <div className="grid p-8 my-6 border rounded-lg grid-cols-2 gap-x-4 gap-y-4">
      {wineList.map((wine) => (
        <WineCard key={wine.wineId} wine={wine} />
      ))}
    </div>
  );
};

export default WineList;
