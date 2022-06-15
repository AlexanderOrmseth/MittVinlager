import { Trash } from "phosphor-react";
import { formatDate } from "../../../app/util/format";

interface Props {
  id: number;
  date: string;
  deleteConsumed: (id: number) => void;
}

const ConsumedWine = ({ id, date, deleteConsumed }: Props) => {
  return (
    <div className="flex even:bg-slate-50 p-2 rounded flex-row gap-x-2 items-center">
      <div className="flex-1 text-gray-900 font-medium">
        {formatDate(new Date(date))}
      </div>
      <button
        className="btn-white p-1 px-1.5 w-auto shadow-none"
        onClick={() => deleteConsumed(id)}
      >
        <Trash className="text-wine-500" size="1.5rem" />
      </button>
    </div>
  );
};

export default ConsumedWine;
