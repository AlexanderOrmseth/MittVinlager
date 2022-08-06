import React, { FunctionComponent } from "react";
import InventoryMessage from "../../features/wine/list/InventoryMessage";
import { ArrowLeft, Robot } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  message?: string;
  showPath?: boolean;
}

const NotFound: FunctionComponent<Props> = ({
  message = "Denne siden eksisterer ikke",
  showPath = true,
}) => {
  const location = useLocation();

  return (
    <InventoryMessage
      Icon={Robot}
      message={
        <p>
          {showPath && (
            <em className="mr-1 px-2 py-1.5 rounded bg-slate-50 dark:bg-gray-900 text-sm font-bold text-gray-800 dark:text-gray-200">
              {location.pathname}
            </em>
          )}
          {message}
        </p>
      }
    >
      <Link
        className="btn-white-large"
        replace
        // ts is not happy :)
        to={-1 as any}
      >
        <ArrowLeft size="1.5em" />
        Tilbake
      </Link>
    </InventoryMessage>
  );
};

export default NotFound;
