import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { X } from "phosphor-react";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  xl?: boolean;
}

const Modal = ({
  isOpen,
  setIsOpen,
  description,
  title,
  children,
  xl
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // prevent modal buttons being focused on load
  // reason: users could accidentally delete wine
  useEffect(() => {
    if (containerRef.current && scrollContainerRef.current && isOpen) {
      // fix for focus on /inventory
      setTimeout(() => containerRef.current?.focus(), 50);
    }
  }, [containerRef, isOpen, scrollContainerRef]);

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
              transition: { duration: 0.15, ease: "easeInOut" }
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, ease: "easeIn" }
            }}
            className="fixed inset-0 bg-black/30 backdrop-blur dark:bg-black/60"
            aria-hidden="true"
          />

          <div
            ref={scrollContainerRef}
            className="fixed inset-0 overflow-y-auto"
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel
                as={motion.div}
                initial={{
                  opacity: 0,
                  scale: 0.75
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    ease: "easeOut",
                    duration: 0.25
                  }
                }}
                exit={{
                  scale: 0.75,
                  opacity: 0,
                  transition: {
                    ease: "easeIn",
                    duration: 0.2
                  }
                }}
                className={`mx-auto w-full overflow-hidden align-middle ${
                  xl ? "max-w-2xl" : "max-w-md"
                }  rounded bg-white p-4 shadow-lg dark:border dark:border-gray-700 dark:bg-gray-900 dark:shadow-2xl`}
              >
                <Dialog.Title
                  as="h3"
                  tabIndex={-1}
                  ref={containerRef}
                  className="mb-2 flex items-center justify-between text-lg font-medium leading-6 text-gray-900 outline-none dark:text-gray-50"
                >
                  {title}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="opacity-70 hover:opacity-100"
                  >
                    <X size="1.8rem" />
                  </button>
                </Dialog.Title>
                <Dialog.Description className="mb-4 border-b pb-2 text-sm text-slate-600 dark:border-gray-700 dark:text-gray-300">
                  {description}
                </Dialog.Description>
                <div>
                  {children}
                  <button
                    className="btn-white mt-4 h-10 rounded-full"
                    onClick={() => setIsOpen(false)}
                    onBlur={() => containerRef?.current?.focus()}
                  >
                    Avbryt
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
