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
      className={`flex w-full select-none flex-row items-center gap-x-2 rounded px-2 py-2.5 text-left leading-4 text-gray-700 dark:text-gray-400 sm:py-2 ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "group xs:hover:bg-slate-100 xs:hover:text-gray-900 xs:dark:hover:bg-gray-800/50 xs:dark:hover:text-gray-200 cursor-pointer"
      } `}
    >
      <div
        className={`
        ${type === "radio" ? "rounded-full" : "rounded"}
             flex h-5 w-5
            items-center justify-center border-2 
             ${
               checked && type === "radio"
                 ? "border-wine-400 dark:border-wine-300 bg-white dark:bg-gray-900/60"
                 : checked && type === "checkbox"
                 ? "bg-wine-500 dark:bg-wine-400 border-wine-500 dark:border-wine-400 text-white"
                 : "xs:group-hover:border-gray-400 xs:dark:group-hover:border-gray-600 border-slate-300 bg-white dark:border-gray-700 dark:bg-gray-900/60"
             }`}
      >
        {checked &&
          (type === "radio" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="bg-wine-500 dark:bg-wine-400 block h-2.5 w-2.5 rounded-full"
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

      <div
        className={`${
          checked ? "text-gray-800 dark:text-gray-200" : ""
        } flex-1`}
      >
        {displayText.length > 40
          ? displayText.substring(0, 40) + "..."
          : displayText}
      </div>
    </div>
  );
};

export default RadioOrCheckboxItem;
