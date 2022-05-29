interface Props {
  dt: string;
  dd?: string | number | null | undefined;
  children?: React.ReactNode;
}
const DescriptionItem = ({ dt, dd, children }: Props) => {
  return (
    <div className="px-4 odd:bg-white even:bg-slate-50 rounded lg:py-2.5 py-1.5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
      <dt className="text-sm text-left sm:text-right font-medium text-slate-500">
        {dt}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
        {children ?? dd ?? ""}
      </dd>
    </div>
  );
};

export default DescriptionItem;
