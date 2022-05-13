import { Puff } from "react-loading-icons";

interface Props {
  loading: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled: boolean;
  loadingText: string;
}

const LoadingButton = ({
  loading,
  onClick,
  children,
  disabled,
  loadingText,
  type,
}: Props) => {
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn-primary inline-flex items-center gap-2 h-10 ${
        disabled && !loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <>
          <Puff height={"1.5rem"} width={"1.5rem"} strokeWidth={4} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
