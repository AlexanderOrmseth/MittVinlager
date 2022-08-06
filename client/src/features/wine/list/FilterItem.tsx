import React, { FunctionComponent, ReactNode } from "react";
import { NotePencil } from "phosphor-react";

interface Props {
  isChanged: boolean;
  children: ReactNode;
}

const FilterItem: FunctionComponent<Props> = ({ isChanged, children }) => {
  return (
    <div className="relative">
      {isChanged && (
        <NotePencil
          className="absolute z-[1] -right-0 opacity-70 -top-2.5 text-yellow-700 dark:text-yellow-500"
          weight="duotone"
          size="1.1rem"
        />
      )}
      {children}
    </div>
  );
};

export default FilterItem;
