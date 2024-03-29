export interface Wine extends WineBaseModel {
  wineId: number;
  createdAt: string;
  updatedAt: string | null;
  publicId: string | null;
  pictureUrl: string | null;
  imageByUser: boolean;
}

export interface WineBaseModel {
  name: string;
  type: string;
  year: number | null;
  price: number | null;
  volume: number | null;
  alcoholContent: number | null;
  country: string | null;
  countryId?: string | null;
  region: string | null;
  subRegion: string | null;
  productId: string | null;
  grapes: string[] | null;
  recommendedFood: string[] | null;
  manufacturerName: string | null;
  storagePotential: string | null;
  colour: string | null;
  odour: string | null;
  taste: string | null;
  freshness: number;
  fullness: number;
  bitterness: number;
  sweetness: number;
  tannins: number;
  userDetails: UserDetails;
}

export interface WineFilters {
  countries: string[];
  recommendedFood: string[];
  types: string[];
  grapes: string;
  storageOption: string;
  favoriteOption: string;
}

export interface UserDetails {
  quantity: number;
  purchaseLocation: string | null;
  purchaseDate: string | null | Date;
  drinkingWindowMin: number | null;
  drinkingWindowMax: number | null;
  userNote: string | null;
  favorite: boolean;
  score: number | null;
  userRating: number | null;
}
