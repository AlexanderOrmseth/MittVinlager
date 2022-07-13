import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

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
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={"div"}
          className="relative z-10"
          open={isOpen}
          onClose={setIsOpen}
        >
          <Dialog.Overlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, ease: "easeIn" },
            }}
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur"
            aria-hidden="true"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel
                as={motion.div}
                initial={{
                  opacity: 0,
                  scale: 0.75,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    ease: "easeOut",
                    duration: 0.2,
                  },
                }}
                exit={{
                  scale: 0.75,
                  opacity: 0,
                  transition: {
                    ease: "easeIn",
                    duration: 0.15,
                  },
                }}
                className={`mx-auto overflow-hidden w-full align-middle ${
                  xl ? "max-w-2xl" : "max-w-md"
                }  rounded bg-white dark:bg-gray-900 dark:border dark:border-gray-700 shadow-lg dark:shadow-2xl p-4`}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 mb-2 text-gray-900 dark:text-gray-50"
                >
                  {title}
                </Dialog.Title>
                <Dialog.Description className="text-sm mb-4 border-b pb-2 dark:border-gray-700 text-slate-600 dark:text-gray-300">
                  {description}
                </Dialog.Description>

                {children}
                <button
                  className="btn-white mt-4 h-10 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  Tilbake
                </button>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
