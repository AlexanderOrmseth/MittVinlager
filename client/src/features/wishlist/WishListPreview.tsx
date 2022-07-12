import React from "react";
import LoadingButton from "../../app/components/LoadingButton";
import { FormModel } from "../../app/models/wine";
import { formatAlcoholContent, formatPrice } from "../../app/util/format";
import { vinmonopoletImage } from "../../app/util/vinmonopolet";
import { useAddWishlistItemMutation } from "../api/apiSlice";

interface Props {
  wine: FormModel | null;
  setWine: React.Dispatch<React.SetStateAction<FormModel | null>>;
}

const WishListPreview = ({ wine, setWine }: Props) => {
  const [addWishlistItem, { isLoading, isSuccess, isError }] =
    useAddWishlistItemMutation();

  if (!wine) return null;

  const handleAddWishlistItem = async () => {
    if (!wine.productId) {
      return;
    }

    const newWishItem = {
      name: wine.name,
      productId: wine.productId,
      type: wine.type,
      alcoholContent: wine.alcoholContent,
      country: wine.country,
      price: wine.price,
    };

    await addWishlistItem(newWishItem)
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    // reset selected wine
    setWine(null);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800/40 dark:border-gray-700 border rounded-lg text-center basis-96">
      <h3 className="font-bold text-blue-wine-500 dark:text-blue-wine-25 mb-2">
        {wine.name}
      </h3>
      <img
        className="object-scale-down mx-auto pointer-events-none select-none rounded w-36 h-36"
        src={vinmonopoletImage(wine.productId, 200)}
        alt={`Bilde av en vin: ${wine.name}`}
      />
      <div className="grid text-gray-700 dark:text-gray-300 my-3 grid-cols-2 gap-2">
        <p>{wine.type}</p>
        <p>{formatAlcoholContent(wine.alcoholContent)}</p>
        <p>{wine.country}</p>
        <p>{formatPrice(wine.price)}</p>
      </div>

      <LoadingButton
        loading={isLoading}
        disabled={!wine}
        onClick={handleAddWishlistItem}
        loadingText="Legger til vin..."
        className="w-full justify-center"
      >
        Legg til
      </LoadingButton>
    </div>
  );
};

export default WishListPreview;
