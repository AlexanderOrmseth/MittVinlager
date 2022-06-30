import { Link, useNavigate } from "react-router-dom";
import DropDownMenu from "../components/DropDownMenu";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { List, Moon, SignOut, Sun, User, Wine, X } from "phosphor-react";
import { signOut } from "../../features/account/accountSlice";
import { resetAll } from "../../features/wine/slices/wineSlice";
import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import NavLink from "../components/NavLink";
import { toggleTheme } from "../../features/themeSlice";
import { resetStatistics } from "../../features/statistics/statisticsSlice";

const Header = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useAppSelector((state) => state.theme);
  const [isOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const navigate = useNavigate();
  const handleOutsideClick = () => setOpen(false);
  useOnClickOutside(divRef, handleOutsideClick);
  return (
    <div
      ref={divRef}
      className={`grid ${
        user ? "md:grid-cols-[auto_auto_auto]" : "md-grid-cols-[auto_auto]"
      }  grid-cols-[auto_auto] max-w-screen-xl mx-auto justify-between items-center`}
    >
      <Link
        onClick={() => setOpen(false)}
        to="/"
        className="text-xl font-medium flex flex-row gap-2 dark:text-gray-200 items-center"
      >
        <Wine
          size="1.75rem"
          weight="duotone"
          className="text-gray-500 dark:text-gray-400"
        />
        Mitt Vinlager
      </Link>

      <nav
        className={`flex md:flex-row flex-col md:col-auto md:row-start-auto row-start-2 col-span-2 md:space-x-4 md:mt-0 mt-2 space-y-2 ${
          isOpen ? "md:block block" : "md:block hidden"
        }`}
      >
        <NavLink setOpen={setOpen} text="hjem" to="/" />
        {user ? (
          <>
            <NavLink end setOpen={setOpen} text="Vinsamling" to="/inventory" />
            <NavLink setOpen={setOpen} text="Ny vin" to="/inventory/new" />
            <NavLink setOpen={setOpen} text="Ønskeliste" to="/wishlist" />
          </>
        ) : (
          <>
            <NavLink setOpen={setOpen} text="Logg inn" to="/login" />
            <NavLink setOpen={setOpen} text="Ny bruker" to="/register" />
          </>
        )}
      </nav>
      <div className="flex flex-row gap-x-2 items-center">
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
                    dispatch(resetStatistics());
                  },
                },
              ]}
              text={user.userName}
            />
          </div>
        )}
        <button
          onClick={() => setOpen(!isOpen)}
          className="p-2 md:hidden block"
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
