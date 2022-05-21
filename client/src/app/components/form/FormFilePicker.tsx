import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
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

const FormFilePicker = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState, field } = useController({
    ...props,
  });

  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.label}
      </label>
      <Controller
        {...props}
        render={({ field: { onChange, ref, ...rest } }) => (
          <Dropzone
            onChange={(e: any) => onChange(e.target.files[0])}
            {...rest}
          />
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

const Dropzone = ({
  onChange,
  ...rest
}: {
  onChange: (...event: any[]) => void;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // Do something with the files
      console.log({ acceptedFiles });
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
    },
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ onChange })} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FormFilePicker;
