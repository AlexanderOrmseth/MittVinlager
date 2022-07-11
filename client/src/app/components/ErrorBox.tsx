import {WarningCircle} from "phosphor-react";

const ErrorBox = ({message}: {message: string}) => {
  return (
    <div className="my-4 md:p-2.5 p-2 flex items-center border-wine-200 dark:border-wine-400 text-sm border rounded bg-wine-25 dark:bg-wine-500/40 font-medium text-wine-500 dark:text-gray-50">
      <WarningCircle size="1.5rem" className="mr-2" />
      <em className="flex-1">{message}</em>
    </div>
  );
};

export default ErrorBox;
