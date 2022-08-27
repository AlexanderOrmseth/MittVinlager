import {
  Controller,
  UseControllerProps,
  useController,
  FieldValues
} from "react-hook-form";
import Dropzone from "./Dropzone";
import FormInputError from "./FormInputError";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  errors?: string[];
}

const FormFilePicker = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props
  });

  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.label}
      </label>
      <Controller
        {...props}
        render={({ field: { ref, value, ...rest } }) => (
          <Dropzone value={value} {...rest} />
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormFilePicker;
