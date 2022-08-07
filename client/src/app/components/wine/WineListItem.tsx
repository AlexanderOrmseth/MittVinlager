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
  externalLink,
}: Props) => {
  return (
    <li className="flex items-center bg-white border dark:border-gray-800 dark:bg-gray-925 rounded py-2 px-1">
      <img
        className="object-scale-down pointer-events-none select-none rounded w-20 h-28"
        src={pictureUrl || placeholder}
        alt={`Bilde av en vin: ${name}`}
      />
      <div className="flex-1 leading-tight ml-2">
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
