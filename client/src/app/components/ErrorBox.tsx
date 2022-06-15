import { WarningCircle } from "phosphor-react";

const ErrorBox = ({ message }: { message: string }) => {
  return (
    <div className="my-4 p-2 flex items-center border-wine-200 text-sm border rounded bg-wine-25 font-medium text-wine-500">
      <WarningCircle size="1.5rem" className="mr-2" />
      <p className="flex-1">{message}</p>
    </div>
  );
};

export default ErrorBox;
