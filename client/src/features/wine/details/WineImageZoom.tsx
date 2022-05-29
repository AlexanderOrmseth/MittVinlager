import { useState } from "react";
import { Controlled as Zoom } from "react-medium-image-zoom";
import placeholderImg from "../../../app/assets/bottle.png";
import "react-medium-image-zoom/dist/styles.css";

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
    <div className="flex flex-col items-center">
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
    </div>
  );
};

export default WineImageZoom;
