import { Menu, Transition } from "@headlessui/react";
import { CaretDown } from "phosphor-react";
import { MenuButton } from "../models/menuButton";

interface Props {
  buttons: MenuButton[];
  text: string;
}
const DropDownMenu = ({ buttons, text }: Props) => {
  return (
    <Menu as="div" className="relative inline-block z-10 text-left">
      <div>
        <Menu.Button className="inline-flex select-none w-full shadow-xxs items-center gap-2 rounded-md py-2 bg-white border capitalize transition-all cursor-pointer px-4 text-center font-medium text-sm hover:bg-slate-50 active:bg-slate-100 active:text-gray-700">
          {text}
          <CaretDown size="1rem" />
        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right dropdown">
          <div className="px-1 py-1 ">
            {buttons.map((button, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <div>
                    {button.divide && <div className="my-2 border-t"></div>}
                    <button
                      onClick={button.fnc}
                      className={`${
                        active ? "bg-wine-500 text-white" : "text-gray-900"
                      } group flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm`}
                    >
                      {button.icon && button.icon}
                      {button.text}
                    </button>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDownMenu;
