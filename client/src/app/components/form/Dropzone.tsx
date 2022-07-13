import { CheckCircle, FileImage } from "phosphor-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const maxSize = 1048576;

const Dropzone = ({
  onChange,
  value,
  ...rest
}: {
  onChange: (...event: any[]) => void;
  value: File | null;
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

  const {
    getRootProps,
    getInputProps,
    isDragActive,

    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple: false,
    minSize: 0,
    maxSize,
    accept: {
      "image/*": [],
    },
  });

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

  return (
    <div>
      {value && (
        <div className="flex flex-wrap gap-2 justify-between items-end">
          <button
            className="btn-white w-auto"
            onClick={(e) => {
              e.preventDefault();
              onChange(null);
            }}
          >
            Fjern bilde
          </button>
          {value?.name && (
            <div className="flex flex-row gap-x-2 items-center text-sm text-green-wine-500 dark:text-green-wine-200">
              <CheckCircle size="1.5rem" weight="duotone" />
              {value.name}
            </div>
          )}
        </div>
      )}
      <div
        className="cursor-pointer text-center text-sm my-2"
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p
            className={`${
              isDragActive ? "border border-green-wine-500" : ""
            } rounded border flex items-center flex-col bg-slate-50  border-dashed p-4 shadow-lg text-green-wine-500 font-medium py-4 `}
          >
            {isDragReject ? (
              "Denne filtypen støttes ikke!"
            ) : (
              <FileImage
                size="1.75rem"
                className="animate-bounce"
                weight="duotone"
              />
            )}
          </p>
        ) : (
          <div className="rounded border text-center bg-slate-50 dark:bg-gray-900 dark:border-gray-700 border-dashed border-slate-300 p-4 py-4 hover:bg-slate-100 hover:border-slate-500">
            <div className="flex flex-row gap-2 justify-center items-center">
              <FileImage size="1.75rem" weight="duotone" />
              Trykk her, eller dra et bilde hit
            </div>

            {isFileTooLarge && (
              <p className="text-wine-500"> Filen er for stor!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
