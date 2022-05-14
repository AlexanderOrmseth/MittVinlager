export interface Wine extends FormModel {
  wineId: number;
  createdAt: string;
  updatedAt?: string | null;
}

export interface FormModel {
  name: string;
  type: string;
  year?: number | null;
  price?: number | null;
  volume?: number | null;
  alcoholContent?: number | null;
  country: string;
  countryId?: string | null;
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
  drinkingWindowMin?: number | null;
  drinkingWindowMax?: number | null;
  userNote: string;
  favorite: boolean;
  score: number | null;
  userRating: number | null;
}
