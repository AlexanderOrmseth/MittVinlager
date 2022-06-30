import { Trash } from "phosphor-react";
import { formatDate } from "../../../app/util/format";

interface Props {
  id: number;
  date: string;
  deleteConsumed: (id: number) => void;
}

const ConsumedWine = ({ id, date, deleteConsumed }: Props) => {
  return (
    <li className="flex even:bg-slate-50 dark:even:bg-gray-800/40 p-2 rounded flex-row gap-x-2 items-center">
      <div className="flex-1 text-gray-900 dark:text-gray-200 font-medium">
        {formatDate(new Date(date))}
      </div>
      <button
        className="btn-white p-1 px-1.5 w-auto shadow-none"
        onClick={() => deleteConsumed(id)}
      >
        <Trash className="text-wine-500 dark:text-wine-300" size="1.5rem" />
      </button>
    </li>
  );
};

export default ConsumedWine;
