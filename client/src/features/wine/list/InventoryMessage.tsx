import React, {
  ForwardRefExoticComponent,
  FunctionComponent,
  RefAttributes,
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
  children,
}) => {
  return (
    <div className="flex py-12 text-muted items-center justify-center flex-col gap-y-2">
      <Icon size="5rem" weight="light" className="mb-2" />
      <motion.div
        className="mb-4 relative dark:text-gray-200 min-w-[100px] bg-slate-200 dark:bg-gray-700 p-2 rounded"
        initial={{ x: -16, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
        }}
      >
        {message}
        <div className="absolute top-0 left-1/2 w-0 h-0 border-[16px] border-transparent -mt-3.5 ml-4 border-t-0 border-l-0 border-b-slate-200 dark:border-b-gray-700" />
      </motion.div>
      {children}
    </div>
  );
};

export default InventoryMessage;
