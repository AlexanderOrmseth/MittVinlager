import { FormModel } from "../../../app/models/wine";

export const defaultValues: FormModel = {
  name: "",
  type: "",
  year: 0,
  price: 0,
  volume: 0,
  alcoholContent: 0,
  country: "",
  region: "",
  subRegion: "",
  productId: "",
  grapes: "",
  manufacturerName: "",
  storagePotential: "",
  colour: "",
  odour: "",
  taste: "",
  freshness: 0,
  fullness: 0,
  bitterness: 0,
  sweetness: 0,
  tannins: 0,
  userDetails: {
    quantity: 1,
    purchaseLocation: "",
    purchaseDate: null,
    drinkingWindowMin: 0,
    drinkingWindowMax: 0,
    userNote: "",
    favorite: false,
    score: null,
    userRating: null,
  },
};
