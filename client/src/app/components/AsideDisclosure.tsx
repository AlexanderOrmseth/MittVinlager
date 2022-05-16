import { Disclosure, Transition } from "@headlessui/react";
import { CaretUp } from "phosphor-react";
interface Props {
  text: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AsideDisclosure = ({ text, children, defaultOpen = true }: Props) => {
  return (
    <Disclosure as={"div"} defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className="flex w-full justify-between rounded-lg 
            bg-green-wine-50 px-4 py-3 text-left font-medium text-green-wine-500 
            hover:bg-green-wine-100 
            focus:outline-none focus-visible:ring text-sm focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          >
            <span>{text}</span>
            <CaretUp
              className={`transition-all ${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-green-wine-500`}
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
            <Disclosure.Panel className="px-4 pt-4 pb-2">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default AsideDisclosure;
