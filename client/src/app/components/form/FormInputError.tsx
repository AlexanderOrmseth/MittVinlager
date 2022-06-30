import { FieldError } from "react-hook-form";

interface Props {
  error?: FieldError;
}
const FormInputError = ({ error }: Props) => {
  if (!error) return null;

  return (
    <div className="flex flex-col gap-y-1">
      {error?.message && (
        <p className="text-wine-500 dark:text-wine-300 text-sm italic">
          {error.message}
        </p>
      )}
      {error?.types &&
        Object.values(error.types).map((error, i) => (
          <p
            key={i}
            className="text-wine-500 dark:text-wine-300 text-sm italic"
          >
            {error}
          </p>
        ))}
    </div>
  );
};

export default FormInputError;
