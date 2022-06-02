export interface Statistics {
  type: string;
  quantity: number;
  value: number;
  unique: number;
}

export interface LastPurchased {
  name: string;
  date: string;
  wineId: number;
  pictureUrl?: string | null;
}
