import {TailSpin} from "react-loading-icons";

interface Props {
  text: string;
}

const Spinner = ({text}: Props) => {
  return (
    <div className="p-2">
      <TailSpin
        className="mx-auto"
        height="3rem"
        width="3rem"
        stroke="rgb(55 65 81)"
      />
      <p className="text-center mt-2 font-bold text-gray-900 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
};

export default Spinner;
