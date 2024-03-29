import React, { FunctionComponent } from "react";
import MessageBubble from "../components/MessageBubble";
import { ArrowLeft, Robot } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  message?: string;
  showPath?: boolean;
}

const NotFound: FunctionComponent<Props> = ({
  message = "Denne siden eksisterer ikke",
  showPath = true
}) => {
  const location = useLocation();

  return (
    <MessageBubble
      Icon={Robot}
      message={
        <p>
          {showPath && (
            <em className="mr-1 rounded bg-slate-50 px-2 py-1.5 text-sm font-bold text-gray-800 dark:bg-gray-900 dark:text-gray-200">
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
    </MessageBubble>
  );
};

export default NotFound;
