import { useEffect } from "react";
import { defaultValues } from "./defaultValues";
import toast from "react-hot-toast";
import { WineFormData } from "./validationSchema";
import { ErrorOption, FieldPath } from "react-hook-form";

interface Props {
  serverErrors: Record<string, string[]> | null;
  setError: (
    name: FieldPath<WineFormData>,
    error: ErrorOption,
    options?: { shouldFocus: boolean }
  ) => void;
}

const useServerErrors = ({ serverErrors, setError }: Props) => {
  useEffect(() => {
    if (!serverErrors) return;
    console.log({ serverErrors });
    for (const [key, value] of Object.entries(serverErrors)) {
      if (key in defaultValues || key.includes("userDetails.")) {
        let _key = key;
        // userDetails to camelCase...
        if (_key.includes("userDetails.")) {
          const c = _key.charAt(_key.indexOf(".") + 1);
          _key = "userDetails." + c.toLowerCase() + _key.split(`.${c}`)[1];
        }
        //@ts-expect-error
        setError(_key, {
          types: { ...value }
        });
      } else {
        console.log({ key, value });
        toast.error("Ukjent error!");
      }
    }
  }, [serverErrors, setError]);
};

export default useServerErrors;
