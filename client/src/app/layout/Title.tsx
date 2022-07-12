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
        className={`md:text-4xl flex-wrap text-3xl font-bold ${
          highlighted
            ? "text-wine-500 dark:text-wine-400"
            : "text-gray-900 dark:text-gray-100"
        } mb-4 flex flex-row gap-x-2 items-center ${
          border ? "border-b dark:border-gray-700 pb-2" : ""
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

        <h2 className="flex-1 md:leading-9 leading-7">{title}</h2>
      </div>
      {children && <div className="mt-4 text-less-muted">{children}</div>}
    </>
  );
};

export default Title;
