interface Props {
  dt: string;
  dd: string | number;
}
const DescriptionListItem = ({ dt, dd }: Props) => {
  return (
    <div className="px-4 odd:bg-white even:bg-slate-50 first:rounded-t-lg hover:bg-slate-100 last:rounded-b-lg py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-slate-500">{dt}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{dd}</dd>
    </div>
  );
};

export default DescriptionListItem;
