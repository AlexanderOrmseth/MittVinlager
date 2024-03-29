import { WineFormData } from "./validationSchema";

export const defaultValues: WineFormData = {
  name: "",
  type: "",
  year: null,
  price: null,
  volume: null,
  alcoholContent: null,
  country: null,
  region: null,
  subRegion: null,
  productId: null,
  grapes: null,
  recommendedFood: null,
  manufacturerName: null,
  storagePotential: null,
  colour: null,
  odour: null,
  taste: null,
  freshness: 0,
  fullness: 0,
  bitterness: 0,
  sweetness: 0,
  tannins: 0,
  file: null,
  resetImage: false,
  userDetails: {
    quantity: 1,
    purchaseLocation: null,
    purchaseDate: null,
    drinkingWindowMin: null,
    drinkingWindowMax: null,
    userNote: null,
    favorite: false,
    score: null,
    userRating: null
  }
};
