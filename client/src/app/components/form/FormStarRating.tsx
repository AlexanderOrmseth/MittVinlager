import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import StarPicker from "../StarPicker";
import FormInputError from "./FormInputError";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  errors?: string[];
}
const FormStarRating = <T extends FieldValues>(props: Props<T>) => {
  const {fieldState} = useController({
    ...props,
  });
  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.label}
      </label>
      <Controller
        {...props}
        render={({field: {ref, ...rest}}) => <StarPicker {...rest} />}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormStarRating;
