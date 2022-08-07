import React, { FunctionComponent } from "react";
import { Puff } from "react-loading-icons";

const PageLoad: FunctionComponent = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <Puff height="6rem" width="6rem" stroke="#888" />
    </div>
  );
};

export default PageLoad;