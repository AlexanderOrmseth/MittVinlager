import {
  Controller,
  UseControllerProps,
  useController,
  FieldValues,
} from "react-hook-form";
import FormInputError from "./FormInputError";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  errors?: string[];
}

const FormDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props,
  });

  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.label}
      </label>
      {/* <Controller
        {...props}
        render={({ field }) => (
          <DatePicker
            calendarClassName="rounded mt-1 shadow overflow-hidden"
            locale="no"
            {...field}
          />
        )}
      /> */}
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormDatePicker;
