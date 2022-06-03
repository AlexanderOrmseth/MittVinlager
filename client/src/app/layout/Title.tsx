import { IconProps } from "phosphor-react";

interface Props {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  border?: boolean;
}

const Title = ({ title, Icon, border }: Props) => {
  return (
    <h2
      className={`md:text-4xl text-3xl font-bold text-gray-900 mb-4 flex flex-row gap-x-2 items-center ${
        border ? "border-b pb-2" : ""
      }`}
    >
      <Icon className="text-gray-700" size="1.2em" weight="regular" />
      {title}
    </h2>
  );
};

export default Title;
