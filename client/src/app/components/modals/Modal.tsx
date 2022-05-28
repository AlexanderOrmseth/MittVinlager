import { Dialog } from "@headlessui/react";
interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  xl?: boolean;
}
const Modal = ({
  isOpen,
  setIsOpen,
  description,
  title,
  children,
  xl,
}: Props) => {
  return (
    <Dialog
      as={"div"}
      className="relative z-10"
      open={isOpen}
      onClose={setIsOpen}
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur"
        aria-hidden="true"
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel
            className={`mx-auto transform overflow-hidden w-full align-middle ${
              xl ? "max-w-2xl" : "max-w-md"
            }  rounded bg-white shadow-lg p-4`}
          >
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 mb-2 text-gray-900"
            >
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-sm mb-4 border-b pb-2 text-slate-600">
              {description}
            </Dialog.Description>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
