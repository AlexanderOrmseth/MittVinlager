import { CheckCircle, FileImage } from "phosphor-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const maxSize = 2097152;

const Dropzone = ({
  onChange,
  value,
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
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].file.size >= maxSize;

  return (
    <div>
      {value && (
        <div className="flex flex-wrap items-end justify-between gap-2">
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
            <div className="text-green-wine-500 dark:text-green-wine-200 flex flex-row items-center gap-x-2 text-sm">
              <CheckCircle size="1.5rem" weight="duotone" />
              {value.name}
            </div>
          )}
        </div>
      )}
      <div
        className="my-2 cursor-pointer text-center text-sm"
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p
            className={`${
              !isDragReject
                ? "border-green-wine-500 text-green-wine-500 dark:border-green-wine-300 dark:text-green-wine-300 border"
                : "text-wine-500 dark:text-wine-400 dark:border-wine-400 border-wine-500 border"
            } flex flex-col items-center rounded border border-dashed bg-slate-50 p-4 py-4 font-medium shadow-lg dark:bg-gray-900 `}
          >
            {isDragReject ? (
              "Denne filtypen støttes ikke, filtyper som er støttet er: 'jpg, jpeg, png'."
            ) : (
              <FileImage
                size="1.75rem"
                className="animate-bounce"
                weight="duotone"
              />
            )}
          </p>
        ) : (
          <div className="text-muted rounded border border-dashed border-slate-300 bg-slate-50 p-4 py-4 text-center hover:border-slate-500 hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600">
            <div className="flex flex-row items-center justify-center gap-2">
              <FileImage size="1.75rem" weight="duotone" />
              Trykk her, eller dra et bilde hit
            </div>

            {isFileTooLarge ? (
              <strong className="text-wine-500 dark:text-wine-300 mt-2 block font-medium">
                Størrelsen på filen er for stor, max størrelse er 2MB.
              </strong>
            ) : (
              <p className="mt-0.5 text-xs opacity-60">(Max 2MB)</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
