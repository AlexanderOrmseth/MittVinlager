import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({
  onChange,
  ...rest
}: {
  onChange: (...event: any[]) => void;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles) {
        onChange(acceptedFiles[0]);
      } else {
        onChange(null);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });
  return (
    <div>
      <button
        className="btn-white w-auto"
        onClick={(e) => {
          e.preventDefault();
          onChange(null);
        }}
      >
        Fjern bilde
      </button>
      <div className="cursor-pointer text-center my-2" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p
            className={`animate-pulse ${
              isDragActive ? "border border-wine-300" : ""
            } rounded border  bg-slate-50 border-dashed p-4 text-wine-500 font-medium py-8 `}
          >
            Dra bildet hit
          </p>
        ) : (
          <p className="rounded border  bg-slate-50 border-dashed p-4  py-8 hover:bg-slate-100 hover:border-slate-500">
            Trykk her, eller dra et bilde hit
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
