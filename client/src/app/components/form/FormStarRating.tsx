import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import FormInputError from "./FormInputError";

interface Props<T> extends UseControllerProps<T> {
  options: Option[];
  label: string;
  errors?: string[];
}

interface Option {
  displayText: string;
  value: any;
}

const FormStarRating = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props,
  });

  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.label}
      </label>
      <Controller
        {...props}
        render={({ field }) => <div>Eg er ein stjerne</div>}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormStarRating;
