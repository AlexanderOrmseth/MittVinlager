import { Link } from "react-router-dom";

interface Props {
  name: string;
  pictureUrl: string | undefined;
  children: React.ReactNode;
  to?: string;
}
const WineListItem = ({ name, pictureUrl, children, to }: Props) => {
  return (
    <div className="flex items-center bg-white rounded shadow p-1">
      <img
        className="object-scale-down pointer-events-none select-none rounded w-28 h-28"
        src={pictureUrl}
        alt={`Bilde av en vin: ${name}`}
      />
      <div className="flex-1 ml-2">
        {to ? (
          <Link className="link" to={to}>
            {name}
          </Link>
        ) : (
          <h3 className="text-blue-wine-500 font-medium">{name}</h3>
        )}
        {children}
      </div>
    </div>
  );
};

export default WineListItem;
