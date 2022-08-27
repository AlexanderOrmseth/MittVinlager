import { Info } from "phosphor-react";

export const InfoBox = ({
  message,
  className
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={`border-blue-wine-200 dark:border-blue-wine-400 dark:bg-blue-wine-700 dark:text-blue-wine-25 bg-blue-wine-25 text-blue-wine-500 my-4 
        flex items-center rounded border p-2 text-sm
        font-medium md:p-2.5 ${className ? className : ""} `}
    >
      <Info size="1.5rem" className="mr-2" />
      <em className="flex-1">{message}</em>
    </div>
  );
};
