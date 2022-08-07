import { Link, useNavigate } from "react-router-dom";
import DropDownMenu from "../components/DropDownMenu";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { List, Moon, SignOut, Sun, User, Wine, X } from "phosphor-react";
import { signOut } from "../../features/account/accountSlice";
import { resetAll } from "../../features/wine/wineSlice";
import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import NavLink from "../components/NavLink";
import { toggleTheme } from "../../features/ui/themeSlice";
import GoogleButton from "../../features/account/GoogleButton";

const Header = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { darkMode } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.account);
  const handleOutsideClick = () => setOpen(false);
  useOnClickOutside(divRef, handleOutsideClick);
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      ref={divRef}
      className={`grid ${
        user ? "md:grid-cols-[auto_auto_auto]" : "md-grid-cols-[auto_auto]"
      }  mx-auto max-w-screen-xl grid-cols-[auto_auto] items-center justify-between`}
    >
      <Link
        onClick={() => setOpen(false)}
        to="/"
        className="flex flex-row flex-wrap items-center gap-2 text-xl font-medium dark:text-gray-200"
      >
        <Wine
          size="1.75rem"
          weight="duotone"
          className="text-gray-500 dark:text-gray-400"
        />
        <h1 className="flex-1 leading-5">Mitt Vinlager</h1>
      </Link>

      <nav
        className={`col-span-2 row-start-2 mt-2 flex flex-col space-y-2 md:col-auto md:row-start-auto md:mt-0 md:flex-row md:space-x-4 ${
          isOpen ? "block md:block" : "hidden md:block"
        }`}
      >
        {user ? (
          <>
            <NavLink end setOpen={setOpen} text="Vinsamling" to="/inventory" />
            <NavLink setOpen={setOpen} text="Ny vin" to="/inventory/new" />
            <NavLink setOpen={setOpen} text="Ønskeliste" to="/wishlist" />
            <NavLink setOpen={setOpen} text="Profil" to="/profile" />
          </>
        ) : (
          <GoogleButton />
        )}
      </nav>
      <div className="flex flex-row items-center gap-x-2">
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
                  text: darkMode ? "Lyst tema" : "Mørkt tema",
                  icon: darkMode ? (
                    <Sun size="1.2rem" />
                  ) : (
                    <Moon size="1.2rem" />
                  ),
                  fnc: () => dispatch(toggleTheme()),
                },
                {
                  text: "Logg ut",
                  icon: <SignOut size="1.2rem" />,
                  divide: true,
                  fnc: () => {
                    dispatch(signOut());
                    dispatch(resetAll());
                  },
                },
              ]}
              text={
                user.displayName
                  ? user.displayName.length > 15
                    ? user.displayName.slice(0, 15) + "..."
                    : user.displayName
                  : "Anonym"
              }
            />
          </div>
        )}
        <button
          onClick={() => setOpen(!isOpen)}
          className="block p-2 md:hidden"
        >
          {isOpen ? (
            <X size="2rem" weight="regular" />
          ) : (
            <List size="2rem" weight="regular" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
