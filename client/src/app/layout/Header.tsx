import { NavLink, Link, useNavigate } from "react-router-dom";
import DropDownMenu from "../components/DropDownMenu";
import { useAppSelector } from "../store/configureStore";
import { MenuButton } from "../models/menuButton";
import { Moon, SignOut, User, Wine } from "phosphor-react";

const Header = () => {
  const { user } = useAppSelector((state) => state.account);
  const navigate = useNavigate();

  return (
    <div className="flex max-w-screen-xl mx-auto flex-wrap justify-between items-center">
      <Link
        to="/"
        className="text-xl font-medium flex flex-row gap-2 items-center"
      >
        <Wine size="1.75rem" weight="duotone" />
        Mitt Vinlager
      </Link>
      <nav className="flex flex-row gap-x-4">
        <NavLink className="nav-link" to="/">
          Hjem
        </NavLink>

        {user ? (
          <>
            <NavLink end className="nav-link" to="/inventory">
              Vinsamling
            </NavLink>
            <NavLink className="nav-link" to="/inventory/new">
              Ny vin
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="nav-link" to="/login">
              Logg inn
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Ny bruker
            </NavLink>
          </>
        )}
      </nav>
      {user && (
        <div>
          <DropDownMenu
            buttons={[
              {
                text: "Min profil",
                icon: <User size="1.2rem" />,
                fnc: () => navigate("/profile"),
              },
              {
                text: "Mørkt tema",
                icon: <Moon size="1.2rem" />,
                fnc: () => navigate("/profile"),
              },
              {
                text: "Logg ut",
                icon: <SignOut size="1.2rem" />,
                divide: true,
                fnc: () => {
                  console.log("Log out");
                },
              },
            ]}
            text={user.userName}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
