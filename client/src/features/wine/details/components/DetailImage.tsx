import { useState } from "react";
import { Controlled as Zoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  placeholder,
  vinmonopoletImage
} from "../../../../app/util/vinmonopolet";

/// Note: Using version 4.4.3 of react-medium-image-zoom, due to a lot of bugs in v5+

const DetailImage = ({
  pictureUrl,
  productId,
  imageByUser
}: {
  pictureUrl?: string | null;
  productId?: string | null;
  imageByUser?: boolean;
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomImgSrc, setZoomImgSrc] = useState<string | undefined>(undefined);
  const enabled = productId || imageByUser;

  const handleZoomChange = (shouldZoom: boolean): void => {
    if (enabled) {
      // this is to prevent unnecessary src fetching from external websites
      if (shouldZoom && !zoomImgSrc) {
        const src =
          imageByUser && pictureUrl
            ? pictureUrl
            : vinmonopoletImage(productId, 900);
        setZoomImgSrc(src);
      }

      setIsZoomed(shouldZoom);
    }
  };

  return (
    <div className="block-muted flex flex-col items-center  overflow-auto p-2 md:sticky  md:top-4">
      <Zoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
        <img
          className={`mx-auto h-80 w-80 object-scale-down ${
            isZoomed ? "hidden" : "block"
          }`}
          alt="Bilde av vin"
          src={pictureUrl || placeholder}
        />
        {enabled && zoomImgSrc && (
          <img
            className={`h-80 w-80 object-scale-down ${
              isZoomed ? "block" : "hidden"
            }`}
            alt="Bilde av vin"
            src={zoomImgSrc}
          />
        )}
      </Zoom>
      {enabled && (
        <p className="text-muted text-sm">Trykk på bilde for å zoome inn.</p>
      )}
    </div>
  );
};

export default DetailImage;
