import { Trash } from "phosphor-react";
import Time from "../../../app/components/Time";

interface Props {
  id: number;
  date: string;
  deleteDate: (id: number) => void;
}

const ConsumedWine = ({ id, date, deleteDate }: Props) => {
  return (
    <li className="dark:even:bg-gray-950/50 flex flex-row items-center gap-x-2 rounded p-2 even:bg-slate-50">
      <div className="flex-1 font-medium text-gray-900 dark:text-gray-200">
        <Time date={date} />
      </div>
      <button
        className="btn-white w-auto p-1 px-1.5 shadow-none"
        onClick={() => deleteDate(id)}
      >
        <Trash className="text-wine-500 dark:text-wine-300" size="1.5rem" />
      </button>
    </li>
  );
};

export default ConsumedWine;
