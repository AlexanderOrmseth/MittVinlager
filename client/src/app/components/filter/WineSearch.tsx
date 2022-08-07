import { MagnifyingGlass, Record, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { setParams } from "../../../features/wine/wineSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { useDebouncedCallback } from "use-debounce";

const WineSearch = ({ disabled }: { disabled: boolean }) => {
  const wineSearchTerm = useAppSelector(
    (state) => state.wine.wineParams.searchTerm
  );
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState(wineSearchTerm || "");

  // Debounce callback
  const debounced = useDebouncedCallback(
    (value) => dispatch(setParams({ searchTerm: value.trim() })),
    1000
  );

  // reset local state
  useEffect(() => {
    if (wineSearchTerm === "") setSearchTerm("");
  }, [wineSearchTerm]);

  const handleOnChange = (val: HTMLInputElement["value"]) => {
    if (disabled) return;
    setSearchTerm(val);
    debounced(val);
  };
  return (
    <div>
      <label className="label">Søk</label>
      <div
        className={`relative flex flex-row items-center ${
          disabled ? "opacity-50" : ""
        }`}
      >
        {searchTerm !== wineSearchTerm ? (
          <Record
            size="1.25rem"
            className="absolute ml-2 text-slate-500"
            weight="duotone"
          />
        ) : (
          <MagnifyingGlass
            className="absolute ml-2 text-slate-500"
            size="1.25rem"
          />
        )}
        <input
          className="text-input h-10 px-8"
          type="text"
          placeholder="søk"
          value={searchTerm}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => handleOnChange("")}
            disabled={disabled}
            className="text-less-muted absolute right-1 rounded p-1 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <X size="1.3rem" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WineSearch;
