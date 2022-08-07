import { ReactNode } from "react";

interface Props {
  dt: string;
  dd?: string | number | null | undefined;
  children?: ReactNode;
}

const DescriptionItem = ({ dt, dd, children }: Props) => {
  return (
    <div className="sm:dark:hover:bg-gray-950/40 px-4 py-1.5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6 lg:py-2.5">
      <dt className="flex items-center justify-start text-sm font-medium text-slate-500 dark:text-gray-400 sm:justify-end">
        {dt}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:col-span-3 sm:mt-0">
        {children ?? dd ?? ""}
      </dd>
    </div>
  );
};

export default DescriptionItem;
