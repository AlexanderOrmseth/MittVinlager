export interface Consumed {
  date: string;
  id: number;
}

export interface LastConsumed extends Consumed {
  pictureUrl?: string | null;
  wineId: number;
  name: string;
}
