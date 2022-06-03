import React, { useState } from "react";
import api from "../../app/api";
import LoadingButton from "../../app/components/LoadingButton";
import { FormModel } from "../../app/models/wine";
import { WishItem } from "../../app/models/wishItem";
import { useAppDispatch } from "../../app/store/configureStore";
import { formatAlcoholContent, formatPrice } from "../../app/util/format";
import { triggerFetch } from "./wishlistSlice";
interface Props {
  wine: FormModel | null;
  setWine: React.Dispatch<React.SetStateAction<FormModel | null>>;
}
const WishListPreview = ({ wine, setWine }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  if (!wine) return null;

  const handleAddWishListItem = async () => {
    if (!wine.productId) {
      return;
    }

    try {
      setLoading(true);
      const newWishItem = {
        name: wine.name,
        productId: wine.productId,
        type: wine.type,
        alcoholContent: wine.alcoholContent,
        country: wine.country,
        price: wine.price,
      } as WishItem;

      // add wish item
      await api.Wishlist.addWishItem(newWishItem);

      // reset selected wine
      setWine(null);

      // trigger fetch
      dispatch(triggerFetch());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white border rounded-lg text-center basis-96">
      <h3 className="font-bold text-blue-wine-500 mb-2">{wine.name}</h3>
      <img
        className="object-scale-down mx-auto pointer-events-none select-none rounded w-36 h-36"
        src={`https://bilder.vinmonopolet.no/cache/400x400-0/${wine.productId}-1.jpg`}
        alt={`Bilde av en vin: ${wine.name}`}
      />
      <div className="grid text-gray-700 my-3 grid-cols-2 gap-2">
        <p>{wine.type}</p>
        <p>{formatAlcoholContent(wine.alcoholContent)}</p>
        <p>{wine.country}</p>
        <p>{formatPrice(wine.price)}</p>
      </div>

      <LoadingButton
        loading={loading}
        disabled={!wine}
        onClick={handleAddWishListItem}
        loadingText="Legger til vin..."
        className="w-full justify-center"
      >
        Legg til
      </LoadingButton>
    </div>
  );
};

export default WishListPreview;
