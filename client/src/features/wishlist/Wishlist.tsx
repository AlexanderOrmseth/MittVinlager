import { Sparkle } from "phosphor-react";
import { useState } from "react";
import { InfoBox } from "../../app/components/InfoBox";
import Spinner from "../../app/components/loading/Spinner";
import VinmonopoletModal from "../../app/components/modals/VinmonopoletModal";
import Title from "../../app/layout/Title";
import { FormModel } from "../../app/models/wine";
import WishlistList from "./WishlistList";
import WishListPreview from "./WishListPreview";
import { useGetWishlistQuery } from "../api/apiSlice";

const Wishlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wine, setWine] = useState<FormModel | null>(null);
  const { data: wishlist, isLoading, isSuccess } = useGetWishlistQuery();
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
          className="btn-secondary w-full h-12 rounded-full disabled-btn"
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

            <div className="flex gap-4 items-start flex-row">
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
