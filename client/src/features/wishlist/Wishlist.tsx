import { Sparkle } from "phosphor-react";
import { useEffect, useState } from "react";
import Spinner from "../../app/components/loading/Spinner";
import VinmonopoletModal from "../../app/components/modals/VinmonopoletModal";
import Title from "../../app/layout/Title";
import { FormModel } from "../../app/models/wine";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import WishlistList from "./WishlistList";
import WishListPreview from "./WishListPreview";
import { getWishlist } from "./wishlistSlice";

const Wishlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wine, setWine] = useState<FormModel | null>(null);
  const dispatch = useAppDispatch();

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

  return (
    <>
      <VinmonopoletModal
        isWishlist
        setValues={setWine}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div>
        <Title title="Ønskeliste" Icon={Sparkle} border>
          <p>
            Her kan du legge til vin i egen ønskeliste. Du kan max ha 10 vin i
            ønskelisten.
          </p>
        </Title>

        <div className="my-4">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            disabled={
              status === "loading" ||
              (wishItems != null && wishItems?.length >= 10)
            }
            className="btn-secondary w-full h-12 rounded-full disabled-btn"
          >
            Hent vin
          </button>
        </div>

        <div className="flex gap-4 items-start flex-row">
          <WishListPreview setWine={setWine} wine={wine} />
          <div className="flex-1 p-4 bg-slate-50 rounded-lg space-y-2">
            {status === "loading" ? (
              <Spinner text="Laster..." />
            ) : (
              <WishlistList items={wishItems} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
