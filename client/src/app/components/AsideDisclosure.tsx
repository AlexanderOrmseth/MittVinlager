import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { CaretUp } from "phosphor-react";

interface Props {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AsideDisclosure = ({ title, children, defaultOpen = true }: Props) => {
  return (
    <Disclosure as={"div"} defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`bg-green-wine-100 dark:bg-green-wine-300/50 text-green-wine-600 hover:bg-green-wine-200/40 dark:hover:bg-green-wine-300/60 relative
              flex w-full select-none justify-between rounded px-5 py-3 text-left
              text-sm font-medium dark:text-white`}
          >
            <span>{title}</span>
            <CaretUp
              className={`transition-transform ${
                open ? "rotate-180" : ""
              } h-5 w-5`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="p-2">{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default AsideDisclosure;
