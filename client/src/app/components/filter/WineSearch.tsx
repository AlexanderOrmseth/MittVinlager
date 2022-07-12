import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { setParams } from "../../../features/wine/wineSlice";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

const WineSearch = ({ disabled }: { disabled: boolean }) => {
  const { wineParams } = useAppSelector((state) => state.wine);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState(wineParams.searchTerm || "");
  const debouncedValue = useDebounce<string>(searchTerm, 1000);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    dispatch(setParams({ searchTerm: debouncedValue }));
  }, [debouncedValue, dispatch]);

  const handleOnChange = (val: HTMLInputElement["value"]) => {
    if (disabled) return;
    setSearchTerm(val);
  };
  return (
    <div>
      <label className="label">Søk på vin</label>
      <div
        className={`flex flex-row items-center ${disabled ? "opacity-50" : ""}`}
      >
        <MagnifyingGlass
          className="absolute ml-2 text-slate-500"
          size="1.25rem"
        />
        <input
          className="text-input pl-8 h-12 shadow-xxs"
          type="text"
          placeholder="søk på vin"
          value={searchTerm}
          onChange={(e) => handleOnChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default WineSearch;
