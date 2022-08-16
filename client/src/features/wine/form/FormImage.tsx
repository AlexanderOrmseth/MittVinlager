import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { placeholder, vinmonopoletImage } from "../../../app/util/vinmonopolet";

interface Props<T> extends UseControllerProps<T> {
  file?: File | null;
  productId?: string | null;
  wine: {
    productId?: string | null;
    pictureUrl?: string | null;
    imageByUser?: boolean | null;
  };
}
const FormImage = <T extends FieldValues>({
  file,
  productId,
  wine,
  ...rest
}: Props<T>) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const { field } = useController({
    ...rest,
  });

  useEffect(() => {
    const handleResetImage = () => {
      setImageSrc(vinmonopoletImage(productId, 300));
    };

    if (file) {
      setImageSrc(URL.createObjectURL(file));
    } else if (wine.imageByUser && !field.value) {
      setImageSrc(wine.pictureUrl ?? placeholder);
    }
    // use product id
    else if (field.value && productId) {
      handleResetImage();
    } else if (wine.productId !== productId) {
      handleResetImage();
    }
    // already uploaded
    else if (wine.pictureUrl) {
      setImageSrc(wine.pictureUrl);
    } else if (productId) {
      handleResetImage();
    }
  }, [wine, productId, file, field.value]);

  return (
    <div
      className={`mb-4 select-none rounded bg-white ${
        imageSrc === placeholder ? "dark:bg-gray-800" : "dark:bg-white"
      }  p-2 shadow md:mb-0`}
    >
      <img
        className="mx-auto h-64 w-64 object-scale-down"
        src={imageSrc}
        alt="Bilde av en vin."
      />
      {wine.imageByUser && productId && !file && (
        <Controller
          {...rest}
          render={({ field: { value, onChange, ...rest } }) => (
            <div className="mt-2 flex flex-row items-center gap-2">
              <Switch
                {...rest}
                checked={value}
                onChange={onChange}
                className={`${
                  value ? "bg-wine-500" : "bg-slate-200 hover:bg-slate-300"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-100`}
              >
                <span
                  className={`${
                    value ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 rounded-full bg-white  transition ease-in-out`}
                />
              </Switch>
              <span className="text-sm font-medium text-gray-700">
                Tilbakestill bilde
              </span>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default FormImage;
