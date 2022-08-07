import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  titleElement?: ReactNode;
  delay?: number;
}

const DescriptionList = ({
  title,
  children,
  titleElement,
  delay = 0,
}: Props) => {
  return (
    <motion.dl
      initial={{ x: -10, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 120, delay: 0.1 * delay }}
      className="overflow-hidden"
    >
      {titleElement ? (
        titleElement
      ) : (
        <div className="text rounded-t-lg border-b py-2 pl-4 text-lg font-medium  text-gray-900 dark:border-gray-700 dark:text-gray-200">
          {title}
        </div>
      )}
      {children}
    </motion.dl>
  );
};

export default DescriptionList;
