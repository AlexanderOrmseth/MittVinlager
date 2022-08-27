import React from "react";
import LoadingButton from "../../app/components/LoadingButton";
import { WineBaseModel } from "../../app/models/wine";
import { formatAlcoholContent, formatPrice } from "../../app/util/format";
import { vinmonopoletImage } from "../../app/util/vinmonopolet";
import { useAddWishlistItemMutation } from "../../app/services/wishlistApi";

interface Props {
  wine: WineBaseModel | null;
  setWine: React.Dispatch<React.SetStateAction<WineBaseModel | null>>;
}

const WishListPreview = ({ wine, setWine }: Props) => {
  const [addWishlistItem, { isLoading }] = useAddWishlistItemMutation();

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
      price: wine.price
    };

    await addWishlistItem(newWishItem)
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    // reset selected wine
    setWine(null);
  };

  return (
    <div className="block-muted basis-96 bg-white p-4 text-center">
      <h3 className="text-blue-wine-500 dark:text-blue-wine-25 mb-2 font-bold">
        {wine.name}
      </h3>
      <img
        className="pointer-events-none mx-auto h-36 w-36 select-none rounded object-scale-down"
        src={vinmonopoletImage(wine.productId, 200)}
        alt={`Bilde av en vin: ${wine.name}`}
      />
      <div className="text-muted my-3 grid grid-cols-2 gap-2">
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
