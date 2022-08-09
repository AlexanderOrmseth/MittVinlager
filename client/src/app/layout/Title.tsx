import { IconProps } from "phosphor-react";
import React, {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

interface Props {
  title: string;
  node?: ReactNode;
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  border?: boolean;
  children?: ReactNode;
  highlighted?: boolean;
}

const Title = ({ title, Icon, border, children, node, highlighted }: Props) => {
  return (
    <>
      <div
        className={`flex-wrap text-2xl font-bold md:text-3xl  ${
          highlighted
            ? "text-wine-500 dark:text-wine-400"
            : "text-gray-900 dark:text-gray-100"
        } mb-4 flex flex-row items-center gap-x-2 ${
          border ? "border-b pb-2 dark:border-gray-700" : ""
        }`}
      >
        {Icon && (
          <Icon
            className="text-gray-700 dark:text-gray-300"
            size="1.2em"
            weight="regular"
          />
        )}

        {!Icon && node && node}

        <h2 className="flex-1 leading-7 md:leading-9">{title}</h2>
      </div>
      {children && <div className="text-less-muted mt-4">{children}</div>}
    </>
  );
};

export default Title;
