import { Trash } from "phosphor-react";
import { useState } from "react";
import api from "../../app/api/api";
import WineListItem from "../../app/components/wine/WineListItem";
import { WishItem } from "../../app/models/wishItem";
import { useAppDispatch } from "../../app/store/configureStore";
import { formatAlcoholContent, formatPrice } from "../../app/util/format";
import { vinmonopoletLink } from "../../app/util/vinmonopolet";
import { removeWishlistItem } from "./wishlistSlice";

interface Props {
  items: WishItem[];
}
const WishlistList = ({ items }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // delete item
  const handleDeleteWishItem = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.Wishlist.deleteWishItem(id);
      dispatch(removeWishlistItem(id));
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 bg-slate-50 dark:bg-gray-800/40 rounded-lg space-y-2">
      {items.map((wishItem) => (
        <WineListItem
          key={wishItem.id}
          name={wishItem.name}
          pictureUrl={wishItem.pictureUrl}
          externalLink
          to={vinmonopoletLink(wishItem.productId)}
        >
          <>
            <div className="flex-1 mb-2 text-sm flex items-center gap-2 comma">
              <p>{wishItem.type}</p>
              {wishItem.country && <p>{wishItem.country}</p>}
              {!!wishItem.price && <p>{formatPrice(wishItem.price)}</p>}
              {!!wishItem.alcoholContent && (
                <p>{formatAlcoholContent(wishItem.alcoholContent)}</p>
              )}
            </div>
            <button
              disabled={loading}
              onClick={() => handleDeleteWishItem(wishItem.id)}
              className="btn-white flex flex-row items-center gap-x-2 py-1.5 w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash
                size="1.5rem"
                weight="duotone"
                className="text-wine-500 dark:text-wine-400"
              />
              Slett
            </button>
          </>
        </WineListItem>
      ))}
    </div>
  );
};

export default WishlistList;
