import { Menu } from "@headlessui/react";
import { CaretDown } from "phosphor-react";
import { Fragment, ReactNode } from "react";
import { MenuButton } from "../models/menuButton";
import DropDownTransition from "./DropDownTransition";

interface Props {
  buttons: MenuButton[];
  text: string;
  icon?: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

const DropDownMenu = ({
  buttons,
  text,
  icon,
  className,
  fullHeight
}: Props) => {
  return (
    <Menu as={Fragment}>
      {({ open }) => (
        <div
          className={`relative inline-block ${open ? "z-10" : ""} ${
            fullHeight ? "h-full self-stretch" : ""
          }`}
        >
          <Menu.Button
            className={`btn-white inline-flex items-center gap-2 ${className}`}
          >
            {!icon ? (
              <>
                {text}
                <CaretDown size="1rem" />
              </>
            ) : (
              icon
            )}
          </Menu.Button>
          <DropDownTransition>
            <Menu.Items className="dropdown absolute right-0 mt-2 w-56 origin-top-right">
              <div className="p-1">
                {buttons.map((button, i) => (
                  <div key={i}>
                    {button.divide && (
                      <div className="my-2 border-t dark:border-gray-800"></div>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={button.fnc}
                          className={`${
                            active
                              ? "bg-wine-500 dark:bg-wine-400 text-white"
                              : "text-gray-900 dark:text-gray-300"
                          } group flex w-full select-none items-center gap-x-2 rounded-md p-2 text-sm`}
                        >
                          {button.icon && button.icon}
                          {button.text}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                ))}
              </div>
            </Menu.Items>
          </DropDownTransition>
        </div>
      )}
    </Menu>
  );
};

export default DropDownMenu;
