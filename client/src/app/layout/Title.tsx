import { IconProps } from "phosphor-react";

interface Props {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  border?: boolean;
  children?: React.ReactNode;
}

const Title = ({ title, Icon, border, children }: Props) => {
  return (
    <>
      <h2
        className={`md:text-4xl text-3xl font-bold text-gray-900 mb-4 flex flex-row gap-x-2 items-center ${
          border ? "border-b pb-2" : ""
        }`}
      >
        <Icon className="text-gray-700" size="1.2em" weight="regular" />
        {title}
      </h2>
      {children && <div className="mt-4 text-slate-700">{children}</div>}
    </>
  );
};

export default Title;
