import { Sparkle } from "phosphor-react";
import { useState } from "react";
import VinmonopoletModal from "../../app/components/modals/VinmonopoletModal";
import Title from "../../app/layout/Title";
import { FormModel } from "../../app/models/wine";
import WishListPreview from "./WishListPreview";

const Wishlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wine, setWine] = useState<FormModel | null>(null);

  return (
    <>
      <VinmonopoletModal
        isWishlist
        setValues={setWine}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <pre>{JSON.stringify(wine, null, 4)}</pre>

      <div>
        <Title title="Ønskeliste" Icon={Sparkle} border />

        <div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn-secondary"
          >
            Hent vin
          </button>
        </div>

        <div>
          <WishListPreview setWine={setWine} wine={wine} />
        </div>
      </div>
    </>
  );
};

export default Wishlist;
