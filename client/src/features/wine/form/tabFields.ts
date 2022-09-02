import { WineFormData } from "./validationSchema";
import { UserDetails } from "../../../app/models/wine";

export type Keys = keyof WineFormData | keyof UserDetails;
const tab1: Keys[] = [
  "name",
  "type",
  "volume",
  "price",
  "storagePotential",
  "region",
  "subRegion",
  "year",
  "alcoholContent",
  "manufacturerName",
  "country",
  "file"
];
const tab2: Keys[] = [
  "freshness",
  "fullness",
  "bitterness",
  "sweetness",
  "tannins",
  "grapes",
  "colour",
  "recommendedFood",
  "odour",
  "taste"
];
const tab3: Keys[] = [
  "quantity",
  "purchaseDate",
  "drinkingWindowMin",
  "drinkingWindowMax",
  "purchaseLocation",
  "userNote",
  "favorite",
  "score",
  "userRating"
];
export const tabFields = [tab1, tab2, tab3];
