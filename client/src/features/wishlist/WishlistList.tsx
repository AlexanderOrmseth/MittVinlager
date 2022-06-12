import { Info, Trash } from "phosphor-react";
import { useState } from "react";
import api from "../../app/api";
import WineListItem from "../../app/components/wine/WineListItem";
import { WishItem } from "../../app/models/wishItem";
import { useAppDispatch } from "../../app/store/configureStore";
import { formatAlcoholContent, formatPrice } from "../../app/util/format";
import { vinmonopoletLink } from "../../app/util/vinmonopolet";
import { removeWishlistItem } from "./wishlistSlice";

interface Props {
  items: WishItem[] | null;
}
const WishlistList = ({ items }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

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
    <>
      {!!items?.length ? (
        items.map((wishItem) => (
          <WineListItem
            key={wishItem.id}
            name={wishItem.name}
            pictureUrl={wishItem.pictureUrl}
          >
            <>
              <div className="flex-1 mb-2 flex items-center gap-2 comma">
                <p>{wishItem.type}</p>
                {wishItem.country && <p>{wishItem.country}</p>}
                {!!wishItem.price && <p>{formatPrice(wishItem.price)}</p>}
                {!!wishItem.alcoholContent && (
                  <p>{formatAlcoholContent(wishItem.alcoholContent)}</p>
                )}
                <a
                  className="link"
                  href={vinmonopoletLink(wishItem.productId)}
                  target="_blank"
                  rel="noreferrer"
                >
                  link
                </a>
              </div>
              <button
                disabled={loading}
                onClick={() => handleDeleteWishItem(wishItem.id)}
                className="btn-white flex flex-row items-center gap-x-2 py-1.5 w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash size="1.5rem" />
                Slett
              </button>
            </>
          </WineListItem>
        ))
      ) : (
        <div className="text-gray-700 flex items-center">
          <Info size="1.5rem" className="mr-1" />
          Du har ingen vin i ønskelisten, trykk "hent vin" og legg til vin.
        </div>
      )}
    </>
  );
};

export default WishlistList;
