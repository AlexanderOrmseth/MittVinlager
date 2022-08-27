import { Link } from "react-router-dom";
import { placeholder } from "../../util/vinmonopolet";
import { ReactNode } from "react";

interface Props {
  name: string;
  pictureUrl?: string | undefined | null;
  children: ReactNode;
  to?: string;
  externalLink?: boolean;
}

const WineListItem = ({
  name,
  pictureUrl,
  children,
  to,
  externalLink
}: Props) => {
  return (
    <li className="dark:bg-gray-925 flex items-center rounded border bg-white p-2 dark:border-gray-800">
      <img
        className="pointer-events-none h-28 w-20 select-none rounded object-scale-down"
        src={pictureUrl || placeholder}
        alt={`Bilde av en vin: ${name}`}
      />
      <div className="ml-2 flex-1 leading-tight">
        {to ? (
          externalLink ? (
            <a className="link" href={to} target="_blank" rel="noreferrer">
              {name}
            </a>
          ) : (
            <Link className="link" to={to}>
              {name}
            </Link>
          )
        ) : (
          <h3 className="text-blue-wine-500 font-medium">{name}</h3>
        )}
        <div className="mt-1">{children}</div>
      </div>
    </li>
  );
};

export default WineListItem;
