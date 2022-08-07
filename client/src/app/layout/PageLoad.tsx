import React, { FunctionComponent } from "react";
import { Puff } from "react-loading-icons";

const PageLoad: FunctionComponent = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Puff height="6rem" width="6rem" stroke="#888" />
    </div>
  );
};

export default PageLoad;
