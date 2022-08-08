import { Fragment, FunctionComponent, ReactNode } from "react";
import { Transition } from "@headlessui/react";

interface Props {
  children: ReactNode;
  isOpen?: boolean;
}

const DropDownTransition: FunctionComponent<Props> = ({ children, isOpen }) => {
  return (
    <Transition
      as={Fragment}
      show={isOpen !== undefined ? isOpen : undefined}
      enter="transition duration-300 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      {children}
    </Transition>
  );
};

export default DropDownTransition;
