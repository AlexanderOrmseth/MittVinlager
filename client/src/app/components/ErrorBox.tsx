import { WarningCircle } from "phosphor-react";

const ErrorBox = ({ message }: { message: string }) => {
  return (
    <div className="border-wine-200 dark:border-wine-400 bg-wine-25 dark:bg-wine-500/40 text-wine-500 my-4 flex items-center rounded border p-2 text-sm font-medium dark:text-gray-50 md:p-2.5">
      <WarningCircle size="1.5rem" className="mr-2" />
      <em className="flex-1">{message}</em>
    </div>
  );
};

export default ErrorBox;
