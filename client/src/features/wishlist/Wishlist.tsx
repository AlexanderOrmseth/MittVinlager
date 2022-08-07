import { Sparkle } from "phosphor-react";
import { useState } from "react";
import { InfoBox } from "../../app/components/InfoBox";
import Spinner from "../../app/components/loading/Spinner";
import VinmonopoletModal from "../../app/components/modals/VinmonopoletModal";
import Title from "../../app/layout/Title";
import { WineBaseModel } from "../../app/models/wine";
import WishlistList from "./WishlistList";
import WishListPreview from "./WishListPreview";
import { useGetWishlistQuery } from "../../app/services/wishlistApi";

const Wishlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wine, setWine] = useState<WineBaseModel | null>(null);
  const { data: wishlist, isLoading } = useGetWishlistQuery();
  const hasItems = !!wishlist?.length;

  return (
    <>
      <VinmonopoletModal
        isWishlist
        setValues={setWine}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="space-y-4">
        <Title title="Ønskeliste" Icon={Sparkle} border>
          <p>
            Her kan du legge til vin i egen ønskeliste. Du kan max ha 10 vin i
            ønskelisten.
          </p>
        </Title>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          disabled={isLoading || (wishlist != null && wishlist?.length >= 10)}
          className="btn-secondary disabled-btn h-12 w-full rounded-full"
        >
          Hent vin
        </button>

        {isLoading ? (
          <Spinner text="Laster..." />
        ) : (
          <>
            {!hasItems && (
              <InfoBox message=" Du har ingen vin i ønskelisten. Trykk på hent vin for å legge til en vin." />
            )}

            <div className="flex flex-row items-start gap-4">
              <WishListPreview setWine={setWine} wine={wine} />
              {hasItems && <WishlistList items={wishlist} />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
