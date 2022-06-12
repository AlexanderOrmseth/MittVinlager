export interface WishItem {
  id: number;
  name: string;
  type: string;
  productId: string;
  country?: string | null;
  price?: number | null;
  alcoholContent?: number | null;
  pictureUrl?: string | null;
}
