import { Trash } from "phosphor-react";
import Time from "../../../app/components/Time";

interface Props {
  id: number;
  date: string;
  deleteDate: (id: number) => void;
}

const ConsumedWine = ({ id, date, deleteDate }: Props) => {
  return (
    <li className="flex even:bg-slate-50 dark:even:bg-gray-950/50 p-2 rounded flex-row gap-x-2 items-center">
      <div className="flex-1 text-gray-900 dark:text-gray-200 font-medium">
        <Time date={date} />
      </div>
      <button
        className="btn-white p-1 px-1.5 w-auto shadow-none"
        onClick={() => deleteDate(id)}
      >
        <Trash className="text-wine-500 dark:text-wine-300" size="1.5rem" />
      </button>
    </li>
  );
};

export default ConsumedWine;