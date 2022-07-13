export interface WishlistItem extends BaseWishlistItem {
  id: number;
  pictureUrl?: string | null;
}

export interface BaseWishlistItem {
  name: string;
  type: string;
  productId: string;
  country?: string | null;
  price?: number | null;
  alcoholContent?: number | null;
}

export type WishlistResponse = WishlistItem[];
