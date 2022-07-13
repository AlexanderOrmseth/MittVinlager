import { Check } from "phosphor-react";

interface Props {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
  disabled: boolean;
}

const WineCheckboxFilter = ({ items, checked, onChange, disabled }: Props) => {
  const handleChecked = (item: string) => {
    if (disabled) return;

    let newCheckedList = [...checked];

    // check / uncheck
    if (newCheckedList.includes(item)) {
      // remove item
      newCheckedList = newCheckedList.filter((i) => !i.includes(item));
    } else {
      // add item
      newCheckedList.push(item);
    }

    onChange(newCheckedList);
  };

  return (
    <div className="select-none">
      {items.map((item, i) => (
        <button
          className={`flex w-full flex-row items-center gap-x-2 transition-all text-gray-700 dark:text-gray-400 rounded p-2 ${
            disabled
              ? "opacity-50 cursor-progress"
              : "cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800/50 hover:gap-x-3"
          } `}
          onClick={() => handleChecked(item)}
          key={i}
        >
          <div
            className={`
            text-white transition-all
            rounded border-2 w-5 h-5
            ${
              checked.includes(item)
                ? "bg-wine-500 border-wine-500 dark:bg-wine-400 dark:border-wine-400"
                : "bg-white dark:bg-gray-900/60 dark:text-transparent border-slate-300 dark:border-gray-700"
            }`}
          >
            {checked.includes(item) && <Check weight="bold" />}
          </div>
          <div className="">{item}</div>
        </button>
      ))}
    </div>
  );
};

export default WineCheckboxFilter;
