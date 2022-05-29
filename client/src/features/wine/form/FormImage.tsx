import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import placeholderImg from "../../../app/assets/bottle.png";

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
  const [imageSrc, setImageSrc] = useState<string | null | undefined>(null);
  const { field } = useController({
    ...rest,
  });

  useEffect(() => {
    const handleResetImage = () => {
      setImageSrc(
        `https://bilder.vinmonopolet.no/cache/300x300-0/${productId}-1.jpg`
      );
    };

    if (file) {
      setImageSrc(URL.createObjectURL(file));
    } else if (wine.imageByUser && !field.value) {
      setImageSrc(wine.pictureUrl);
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
    <div className="md:mb-0 shadow rounded select-none mb-4 p-2 bg-white">
      <img
        className="mx-auto object-scale-down h-64 w-64"
        src={imageSrc || placeholderImg}
        alt="Bilde av en vin."
      />
      {wine.imageByUser && productId && !file && (
        <Controller
          {...rest}
          render={({ field: { value, onChange, ...rest } }) => (
            <div className="flex flex-row gap-2 items-center mt-2">
              <Switch
                {...rest}
                checked={value}
                onChange={onChange}
                className={`${
                  value ? "bg-wine-500" : "bg-slate-200 hover:bg-slate-300"
                } relative transition-colors duration-100 inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    value ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform transition ease-in-out  rounded-full bg-white`}
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
