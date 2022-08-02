import React, { FunctionComponent } from "react";
import { Check } from "phosphor-react";
import { motion } from "framer-motion";

interface Props {
  type: "radio" | "checkbox";
  disabled: boolean;
  checked: boolean;
  displayText: string;
}

const RadioOrCheckboxItem: FunctionComponent<Props> = ({
  disabled,
  checked,
  displayText,
  type,
}) => {
  return (
    <div
      className={`flex w-full select-none flex-row items-center gap-x-2 text-gray-700 dark:text-gray-400 rounded px-2 py-1 ${
        disabled
          ? "opacity-50 cursor-progress"
          : "cursor-pointer hover:text-gray-900 group dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800/50"
      } `}
    >
      <div
        className={`
        ${type === "radio" ? "rounded-full" : "rounded"}
             border-2 w-5 h-5
            flex items-center justify-center 
             ${
               checked && type === "radio"
                 ? "bg-white dark:bg-gray-900/60 border-wine-400 dark:border-wine-300"
                 : checked && type === "checkbox"
                 ? "bg-wine-500 text-white dark:bg-wine-400 border-wine-500 dark:border-wine-400"
                 : "bg-white group-hover:border-gray-400 dark:group-hover:border-gray-600 dark:bg-gray-900/60 border-slate-300 dark:border-gray-700"
             }`}
      >
        {checked &&
          (type === "radio" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="w-2.5 h-2.5 bg-wine-500 dark:bg-wine-400 block rounded-full"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <Check weight="bold" />
            </motion.div>
          ))}
      </div>

      <div className={`${checked ? "dark:text-gray-200 text-gray-800" : ""}`}>
        {displayText}
      </div>
    </div>
  );
};

export default RadioOrCheckboxItem;
