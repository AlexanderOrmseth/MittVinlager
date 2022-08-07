import { FieldError } from "react-hook-form";

interface Props {
  error?: FieldError;
}
const FormInputError = ({ error }: Props) => {
  if (!error) return null;

  return (
    <div className="flex flex-col gap-y-1">
      {error?.message && <em className="form-error">{error.message}</em>}
      {error?.types &&
        Object.values(error.types).map((error, i) => (
          <em key={i} className="form-error">
            {error}
          </em>
        ))}
    </div>
  );
};

export default FormInputError;
