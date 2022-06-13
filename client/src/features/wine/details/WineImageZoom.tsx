import { useState } from "react";
import { Controlled as Zoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { motion } from "framer-motion";
import { vinmonopoletImage, placeholder } from "../../../app/util/vinmonopolet";

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
  const [zoomedImage, setZoomedImage] = useState<string | undefined>(undefined);

  const enabled = productId || imageByUser;

  const handleZoomChange = (shouldZoom: boolean) => {
    if (enabled) {
      // to prevent fetching vinmonopolet image before its needed

      // TODO on scroll change....
      if (!zoomedImage) {
        setZoomedImage(
          imageByUser && pictureUrl
            ? pictureUrl
            : vinmonopoletImage(productId, 900)
        );
      }

      setIsZoomed(shouldZoom);
    }
  };

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
            className={`mx-auto object-scale-down sm:h-80 sm:w-80 w-64 h-64 ${
              isZoomed ? "hidden" : "block"
            }`}
            alt="Bilde av vin"
            src={pictureUrl || placeholder}
          />
          {enabled && (
            <img
              className={`object-scale-down h-80 w-80 ${
                isZoomed ? "block" : "hidden"
              }`}
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
