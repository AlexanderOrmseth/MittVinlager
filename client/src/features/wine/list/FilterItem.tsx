import React, { FunctionComponent, ReactNode } from "react";
import { NotePencil } from "phosphor-react";

interface Props {
  isChanged: boolean;
  children: ReactNode;
  type?: "listbox";
}

const FilterItem: FunctionComponent<Props> = ({
  isChanged,
  children,
  type,
}) => {
  return (
    <div className="relative">
      {isChanged && (
        <NotePencil
          className={`absolute -right-0 ${
            type === "listbox" ? "top-2" : "-top-3"
          }  z-[1] text-yellow-700 opacity-70 dark:text-yellow-500`}
          weight="duotone"
          size="1.1rem"
        />
      )}
      {children}
    </div>
  );
};

export default FilterItem;
