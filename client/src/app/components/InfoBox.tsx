import { Info } from "phosphor-react";

export const InfoBox = ({ message }: { message: string }) => {
  return (
    <div className="my-4 flex items-center text-sm p-2 border-blue-wine-200 border rounded bg-blue-wine-25 font-medium text-blue-wine-500">
      <Info size="1.5rem" className="mr-2" />
      <p className="flex-1">{message}</p>
    </div>
  );
};