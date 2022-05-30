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
        <div
          className={`flex flex-row items-center gap-x-2 transition-all text-gray-700  rounded p-2 ${
            disabled
              ? "opacity-50 cursor-progress"
              : "cursor-pointer hover:text-gray-900 hover:bg-slate-100 hover:gap-x-3"
          } `}
          onClick={() => handleChecked(item)}
          key={i}
        >
          <div
            className={`
            text-white transition-all
            rounded border-2 
            ${
              checked.includes(item)
                ? "bg-wine-500 border-wine-500"
                : "bg-white border-slate-300"
            }`}
          >
            <Check size="1rem" weight="bold" />
          </div>
          <div className="">{item}</div>
        </div>
      ))}
    </div>
  );
};

export default WineCheckboxFilter;
