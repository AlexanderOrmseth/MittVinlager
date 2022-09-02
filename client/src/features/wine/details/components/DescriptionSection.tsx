import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  titleElement?: ReactNode;
}

const DescriptionSection = ({ title, children, titleElement }: Props) => {
  return (
    <dl className="overflow-hidden">
      {titleElement ? (
        titleElement
      ) : (
        <div className="text rounded-t-lg border-b py-2 pl-4 text-lg font-medium  text-gray-900 dark:border-gray-700 dark:text-gray-200">
          {title}
        </div>
      )}
      {children}
    </dl>
  );
};

export default DescriptionSection;
