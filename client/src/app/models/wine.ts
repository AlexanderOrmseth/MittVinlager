export interface Wine extends FormModel {
  wineId: number;
  createdAt: string;
  updatedAt?: string;
}

export interface FormModel {
  name: string;
  type: string;
  year: number;
  price: number;
  volume: number;
  alcoholContent: number;
  country: string;
  region: string;
  subRegion: string;
  productId: string;
  grapes: string;
  manufacturerName: string;
  storagePotential: string;
  colour: string;
  odour: string;
  taste: string;
  freshness: number;
  fullness: number;
  bitterness: number;
  sweetness: number;
  tannins: number;
  userDetails: UserDetails;
}

export interface UserDetails {
  quantity: number;
  purchaseLocation: string;
  purchaseDate?: string | null | Date;
  drinkingWindowMin: number;
  drinkingWindowMax: number;
  userNote: string;
  favorite: boolean;
  score: number | null;
  userRating: number | null;
}
