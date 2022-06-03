import { Info, Sparkle, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import api from "../../app/api";
import VinmonopoletModal from "../../app/components/modals/VinmonopoletModal";
import WineListItem from "../../app/components/wine/WineListItem";
import Title from "../../app/layout/Title";
import { FormModel } from "../../app/models/wine";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { formatAlcoholContent, formatPrice } from "../../app/util/format";
import {
  vinmonopoletImage,
  vinmonopoletLink,
} from "../../app/util/vinmonopolet";
import WishListPreview from "./WishListPreview";
import { getWishlist, removeWishlistItem } from "./wishlistSlice";

const Wishlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wine, setWine] = useState<FormModel | null>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { isFetched, status, wishItems } = useAppSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    if (!isFetched) {
      const promise = dispatch(getWishlist());
      return () => {
        promise.abort();
      };
    }
  }, [dispatch, isFetched]);

  if (status === "loading") return <div>Laster ønskeliste...</div>;

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
      <VinmonopoletModal
        isWishlist
        setValues={setWine}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div>
        <Title title="Ønskeliste" Icon={Sparkle} border />
        <p>
          Her kan du legge til vin i egen ønskeliste. Du kan max ha 10 vin i
          ønskelisten.
        </p>

        <div className="my-4">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            disabled={loading}
            className="btn-secondary w-full h-12 rounded-full"
          >
            Hent vin
          </button>
        </div>

        <div className="flex gap-4 items-start flex-row">
          <WishListPreview setWine={setWine} wine={wine} />
          <div className="flex-1 p-4 bg-slate-50 rounded-lg space-y-2">
            {!!wishItems?.length ? (
              wishItems.map((wishItem) => (
                <WineListItem
                  key={wishItem.id}
                  name={wishItem.name}
                  pictureUrl={vinmonopoletImage(wishItem.productId, 300)}
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
                Du har ingen vin i ønskelisten, trykk "hent vin" og legg til
                vin.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
