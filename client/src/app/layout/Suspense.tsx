import React, { FunctionComponent, ReactNode } from "react";
import PageLoad from "./PageLoad";

interface Props {
  children?: ReactNode | undefined;
}

const Suspense: FunctionComponent<Props> = ({ children }) => {
  return <React.Suspense fallback={<PageLoad />}>{children}</React.Suspense>;
};

export default Suspense;
