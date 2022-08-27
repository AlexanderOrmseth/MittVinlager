import React, {
  ForwardRefExoticComponent,
  FunctionComponent,
  RefAttributes
} from "react";
import { IconProps } from "phosphor-react";
import { motion } from "framer-motion";

interface Props {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  message: React.ReactNode;
  children: React.ReactNode;
}

const InventoryMessage: FunctionComponent<Props> = ({
  Icon,
  message,
  children
}) => {
  return (
    <div className="text-muted flex flex-col items-center justify-center gap-y-2 py-12 px-2">
      <Icon size="5rem" weight="light" className="mb-2" />
      <motion.div
        className="relative mb-4 min-w-[100px] rounded bg-slate-200 p-2 dark:bg-gray-700 dark:text-gray-200"
        initial={{ x: -16, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1
        }}
      >
        {message}
        <div className="absolute top-0 left-1/2 -mt-3.5 ml-4 h-0 w-0 border-[16px] border-t-0 border-l-0 border-transparent border-b-slate-200 dark:border-b-gray-700" />
      </motion.div>
      {children}
    </div>
  );
};

export default InventoryMessage;
