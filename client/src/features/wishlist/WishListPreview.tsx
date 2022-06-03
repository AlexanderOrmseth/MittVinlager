import React, { useState } from "react";
import api from "../../app/api";
import LoadingButton from "../../app/components/LoadingButton";
import { FormModel } from "../../app/models/wine";
import { WishItem } from "../../app/models/wishItem";
import { useAppDispatch } from "../../app/store/configureStore";
import { formatPrice } from "../../app/util/format";
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
    <div>
      <div>
        <h3>{wine.name}</h3>
        <p>{wine.type}</p>
        <p>{formatPrice(wine.price)}</p>
      </div>

      <LoadingButton
        loading={loading}
        disabled={!wine}
        onClick={handleAddWishListItem}
        loadingText="Legger til vin..."
      >
        Legg til
      </LoadingButton>
    </div>
  );
};

export default WishListPreview;
