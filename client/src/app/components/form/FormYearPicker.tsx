import {
  Controller,
  UseControllerProps,
  useController,
  FieldValues,
} from "react-hook-form";
import FormInputError from "./FormInputError";
import YearPicker from "../YearPicker";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  type?: string;
  placeholder?: string;
  errors?: string[];
  minValue: number;
  maxValue: number;
  dropDownMinValue: number;
  dropDownMaxValue: number;
}

const FormYearPicker = <T extends FieldValues>(props: Props<T>) => {
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
          <YearPicker
            {...rest}
            minValue={props.minValue}
            maxValue={props.maxValue}
            dropDownMinValue={props.dropDownMinValue}
            dropDownMaxValue={props.dropDownMaxValue}
            placeholder={props.placeholder}
          />
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormYearPicker;
