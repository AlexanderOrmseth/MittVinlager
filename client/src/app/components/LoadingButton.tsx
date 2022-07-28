import { Puff } from "react-loading-icons";

interface Props {
  loading: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled: boolean;
  isPrimary?: boolean;
  className?: string;
  loadingText: string;
}

const LoadingButton = ({
  loading,
  onClick,
  children,
  className,
  disabled,
  loadingText,
  isPrimary = true,
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${
        isPrimary ? "btn-primary" : "btn-white"
      } inline-flex items-center gap-2 h-10 disabled-btn ${
        className ? className : ""
      }`}
    >
      {loading ? (
        <>
          <Puff
            height="1.5rem"
            stroke="rgb(55 65 81)"
            width="1.5rem"
            strokeWidth={4}
          />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
