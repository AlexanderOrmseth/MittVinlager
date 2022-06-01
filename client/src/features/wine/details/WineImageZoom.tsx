import { useState } from "react";
import { Controlled as Zoom } from "react-medium-image-zoom";
import placeholderImg from "../../../app/assets/bottle.png";
import "react-medium-image-zoom/dist/styles.css";
import { motion } from "framer-motion";

const WineImageZoom = ({
  pictureUrl,
  productId,
  imageByUser,
}: {
  pictureUrl?: string | null;
  productId?: string | null;
  imageByUser?: boolean;
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const enabled = productId || imageByUser;

  const handleZoomChange = (shouldZoom: boolean) => {
    if (enabled) {
      setIsZoomed(shouldZoom);
    }
  };
  const zoomedImage =
    imageByUser && pictureUrl
      ? pictureUrl
      : `https://bilder.vinmonopolet.no/cache/900x900-0/${productId}-1.jpg`;
  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 60, delay: 0 }}
      className="flex flex-col items-center md:sticky md:top-0 overflow-auto"
    >
      <Zoom
        isZoomed={isZoomed}
        transitionDuration={400}
        onZoomChange={handleZoomChange}
      >
        <>
          <img
            hidden={isZoomed}
            className="mx-auto object-scale-down sm:h-80 sm:w-80 w-64 h-64"
            alt="Bilde av vin"
            src={pictureUrl || placeholderImg}
          />
          {enabled && (
            <img
              hidden={!isZoomed}
              className="object-scale-down h-80 w-80"
              alt="Bilde av vin"
              src={zoomedImage}
            />
          )}
        </>
      </Zoom>
      {enabled && (
        <p className="text-slate-600 text-sm">
          Trykk på bilde for å zoome inn.
        </p>
      )}
    </motion.div>
  );
};

export default WineImageZoom;
