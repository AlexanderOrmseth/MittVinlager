import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import FormInputError from "./FormInputError";
import TagInput from "../TagInput";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
  errors?: string[];
}

const FormTagInput = <T extends FieldValues>(props: Props<T>) => {
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
        render={({ field: { ref, ...rest } }) => (
          <TagInput {...rest} placeholder={props.placeholder} />
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormTagInput;
