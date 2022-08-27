import {
  Controller,
  UseControllerProps,
  useController,
  FieldValues
} from "react-hook-form";
import DatePicker from "../DatePicker";
import FormInputError from "./FormInputError";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  errors?: string[];
  text: string;
  hereafter: boolean;
}

const FormDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props
  });

  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.label}
      </label>
      {
        <Controller
          {...props}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              hereafter={props.hereafter}
              onChange={onChange}
              value={value}
              text={props.text}
            />
          )}
        />
      }
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormDatePicker;
