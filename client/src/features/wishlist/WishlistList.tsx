import { Trash } from "phosphor-react";
import WineListItem from "../../app/components/wine/WineListItem";
import { WishlistItem } from "../../app/models/wishlist";
import { formatAlcoholContent, formatPrice } from "../../app/util/format";
import { vinmonopoletLink } from "../../app/util/vinmonopolet";
import { useDeleteWishlistItemMutation } from "./wishlistApi";

interface Props {
  items: WishlistItem[];
}

const WishlistList = ({ items }: Props) => {
  const [deleteWishlistItem, { isLoading, isSuccess, isError }] =
    useDeleteWishlistItemMutation();

  // delete item
  const handleDeleteWishItem = async (id: number) => {
    await deleteWishlistItem(id)
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <ul className="flex-1 p-4 block-less-muted space-y-2">
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
              disabled={isLoading}
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
    </ul>
  );
};

export default WishlistList;
