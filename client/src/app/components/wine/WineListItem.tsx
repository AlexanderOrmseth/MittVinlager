import { Link } from "react-router-dom";
import { placeholder } from "../../util/vinmonopolet";
interface Props {
  name: string;
  pictureUrl?: string | undefined | null;
  children: React.ReactNode;
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
    <div className="flex items-center bg-white rounded shadow p-1">
      <img
        className="object-scale-down pointer-events-none select-none rounded w-28 h-28"
        src={pictureUrl || placeholder}
        alt={`Bilde av en vin: ${name}`}
      />
      <div className="flex-1 ml-2">
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
        {children}
      </div>
    </div>
  );
};

export default WineListItem;
