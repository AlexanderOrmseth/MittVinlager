import { HeartStraight } from "phosphor-react";
import DescriptionItem from "../../../app/components/dl/DescriptionItem";
import DescriptionList from "../../../app/components/dl/DescriptionList";
import Score from "../../../app/components/Score";
import Stars from "../../../app/components/Stars";
import TastePie, { list, text } from "../../../app/components/TastePie";
import Time from "../../../app/components/Time";
import { WineBaseModel } from "../../../app/models/wine";
import {
  formatAlcoholContent,
  formatPrice,
  formatVolume,
} from "../../../app/util/format";

interface Props {
  wine: WineBaseModel;
}

interface TasteValue {
  value: number;
  type: "fullness" | "freshness" | "sweetness" | "tannins" | "bitterness";
  displayText: "Fylde" | "Ferskhet" | "Sødme" | "Tanninsk" | "Bitterhet";
}

const WineDetail = ({ wine }: Props) => {
  const tasteValues: TasteValue[] = [
    { value: wine.tannins, type: "tannins", displayText: "Tanninsk" },
    { value: wine.bitterness, type: "bitterness", displayText: "Bitterhet" },
    { value: wine.sweetness, type: "sweetness", displayText: "Sødme" },
    { value: wine.freshness, type: "freshness", displayText: "Ferskhet" },
    { value: wine.fullness, type: "fullness", displayText: "Fylde" },
  ];

  return (
    <div className=" space-y-4">
      <DescriptionList title="Vindetaljer">
        <DescriptionItem dt="Navn" dd={wine.name} />
        <DescriptionItem dt="Type" dd={wine.type} />
        <DescriptionItem dt="Pris" dd={formatPrice(wine.price)} />
        <DescriptionItem dt="Årgang" dd={wine.year} />
        <DescriptionItem dt="Volum" dd={formatVolume(wine.volume)} />
        <DescriptionItem
          dt="Alkoholinnhold"
          dd={formatAlcoholContent(wine.alcoholContent)}
        />
        <DescriptionItem dt="Lagringsgrad" dd={wine.storagePotential} />
        <DescriptionItem dt="Land">
          <div className="flex items-center gap-x-1">
            {wine.countryId && (
              <span className={`f16 flag ${wine.countryId}`} />
            )}
            {wine.country && wine.country}
          </div>
        </DescriptionItem>
        <DescriptionItem dt="Region, distrikt">
          <div className="comma">
            {wine.region && <span>{wine.region}</span>}
            {wine.subRegion && <span>{wine.subRegion}</span>}
          </div>
        </DescriptionItem>
        <DescriptionItem dt="Produsent" dd={wine.manufacturerName} />
        <DescriptionItem dt="Varenummer" dd={wine.productId} />
      </DescriptionList>

      <DescriptionList title="Smaksdetaljer">
        <DescriptionItem dt="Råstoff" dd={wine.grapes?.join(", ")} />
        <DescriptionItem
          dt="Passer til"
          dd={wine.recommendedFood?.join(", ")}
        />
        <DescriptionItem dt="Farge" dd={wine.colour} />
        <DescriptionItem dt="Duft" dd={wine.odour} />
        <DescriptionItem dt="Smak" dd={wine.taste} />
        <DescriptionItem dt="Smaksverdier">
          <div className="flex flex-wrap items-center gap-4">
            {tasteValues
              .filter((pie) => pie.value)
              .map(({ value, type, displayText }, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-y-2 py-2"
                  >
                    <p className=" text-muted text-xs">{displayText}</p>
                    <TastePie percent={list[value].percent} size={"2rem"} />
                    <p>{text[type][value]}</p>
                  </div>
                );
              })}
          </div>
        </DescriptionItem>
      </DescriptionList>

      <DescriptionList title="Brukerdetaljer">
        <DescriptionItem dt="Antall" dd={wine.userDetails.quantity} />
        <DescriptionItem dt="Dato kjøpt">
          <Time date={wine.userDetails.purchaseDate} />
        </DescriptionItem>
        <DescriptionItem
          dt="Sted kjøpt"
          dd={wine.userDetails.purchaseLocation}
        />
        <DescriptionItem dt="Drikkevindu">
          <div className="space-x-2">
            <span>{wine.userDetails.drinkingWindowMin || "____"}</span>
            <span>-</span>
            <span>{wine.userDetails.drinkingWindowMax || "____"}</span>
          </div>
        </DescriptionItem>
        <DescriptionItem dt="Favoritt">
          {wine.userDetails.favorite ? (
            <div className="flex flex-row items-center gap-x-1">
              <HeartStraight
                size="1.5rem"
                weight="duotone"
                className="dark:text-wine-300 text-wine-500"
              />
              Favoritt
            </div>
          ) : (
            "Ikke lagret som favoritt"
          )}
        </DescriptionItem>
        <DescriptionItem dt="Dine notater" dd={wine.userDetails.userNote} />
        <DescriptionItem dt="Karakter">
          <Score value={wine.userDetails.score} />
        </DescriptionItem>
        <DescriptionItem dt="Stjerner">
          <Stars stars={wine.userDetails.userRating || 0} />
        </DescriptionItem>
      </DescriptionList>
    </div>
  );
};

export default WineDetail;
