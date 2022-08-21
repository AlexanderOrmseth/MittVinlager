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
    <Disclosure
      as={"div"}
      className="overflow-hidden"
      defaultOpen={defaultOpen}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`bg-green-wine-100 focus:ring-green-wine-200/50 dark:bg-green-wine-300/50 text-green-wine-600 hover:bg-green-wine-200/40 dark:hover:bg-green-wine-300/60 relative flex w-full select-none justify-between
              rounded px-5 py-3 text-left text-sm font-medium outline-none focus:ring-2 leading-tight items-center gap-x-1
              focus:ring-inset dark:text-white`}
          >
            <span className="flex-1">{title}</span>
            <CaretUp
              className={`transition-transform ${
                open ? "rotate-180" : ""
              } h-5 w-5`}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition transition-[max-height] duration-500 ease-in"
            enterFrom="transform max-h-0"
            enterTo="transform max-h-screen"
            leave="transition transition-[max-height] duration-200 ease-out"
            leaveFrom="transform max-h-screen"
            leaveTo="transform max-h-0"
          >
            <Disclosure.Panel className="p-2">{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default AsideDisclosure;
