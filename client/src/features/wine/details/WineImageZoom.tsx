import { useState } from "react";
import { Controlled as Zoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const WineImageZoom = ({
  pictureUrl,
  productId,
}: {
  pictureUrl: string;
  productId: string;
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = (shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-slate-600 text-sm">Trykk på bilde for å zoome inn.</p>
      <Zoom
        isZoomed={isZoomed}
        transitionDuration={400}
        onZoomChange={handleZoomChange}
      >
        <div className="w-28">
          <img
            hidden={isZoomed}
            className="mx-auto"
            alt="Bilde av vin"
            src={pictureUrl}
          />
          <img
            hidden={!isZoomed}
            alt="Bilde av vin"
            src={`https://bilder.vinmonopolet.no/cache/900x900-0/${productId}-1.jpg`}
          />
        </div>
      </Zoom>
    </div>
  );
};

export default WineImageZoom;
