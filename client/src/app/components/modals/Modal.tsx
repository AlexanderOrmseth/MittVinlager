import { Dialog } from "@headlessui/react";
interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}
const Modal = ({ isOpen, setIsOpen, description, title, children }: Props) => {
  return (
    <Dialog className="relative z-10" open={isOpen} onClose={setIsOpen}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto transition-all max-w-sm rounded bg-white shadow-lg p-4">
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
