import { Puff } from "react-loading-icons";

interface Props {
  loading?: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled: boolean;
  isPrimary?: boolean;
  className?: string;
  loadingText?: string;
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
      aria-disabled={disabled || loading}
      aria-busy={loading}
      className={`${
        isPrimary ? "btn-primary" : "btn-white"
      } disabled-btn inline-flex h-10 items-center gap-2 ${
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
