import { LastConsumed } from "./consumed";

export interface InventoryStatus {
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

export interface StatisticsResponse {
  inventoryStatus: InventoryStatus[];
  lastPurchased: LastPurchased[];
  lastConsumed: LastConsumed[];
}
