import {NavLink as Link} from "react-router-dom";
interface Props {
  text: string;
  setOpen: (value: boolean) => void;
  to: string;
  end?: boolean;
}
const NavLink = ({text, setOpen, to, end}: Props) => {
  return (
    <Link onClick={() => setOpen(false)} end={end} className="nav-link" to={to}>
      {text}
    </Link>
  );
};

export default NavLink;
