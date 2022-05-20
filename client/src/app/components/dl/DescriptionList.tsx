interface Props {
  title?: string;
  children: React.ReactNode;
  titleElement?: React.ReactNode;
}

const DescriptionList = ({ title, children, titleElement }: Props) => {
  return (
    <dl className="">
      {titleElement ? (
        titleElement
      ) : (
        <div className="font-medium rounded-t-lg text pl-4 text-sm  text-gray-900 py-2">
          {title}
        </div>
      )}
      {children}
    </dl>
  );
};

export default DescriptionList;
