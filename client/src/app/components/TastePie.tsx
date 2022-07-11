export const list = [
  {percent: 0, value: 0},
  {percent: 8.33, value: 1},
  {percent: 16.33, value: 2},
  {percent: 25, value: 3},
  {percent: 33.32, value: 4},
  {percent: 41.65, value: 5},
  {percent: 50, value: 6},
  {percent: 58.31, value: 7},
  {percent: 66.64, value: 8},
  {percent: 75, value: 9},
  {percent: 83.3, value: 10},
  {percent: 91.63, value: 11},
  {percent: 100, value: 12},
];

export const text = {
  fullness: [
    "Ingen",
    "Svært lett",
    "Svært lett",
    "Lett",
    "Lett",
    "Middels fylde",
    "Middels fylde",
    "God fylde",
    "God fylde",
    "Fyldig",
    "Fyldig",
    "Svært fyldig",
    "Svært fyldig",
  ],
  freshness: [
    "Ingen",
    "Svært lav friskhet",
    "Svært lav friskhet",
    "Lav friskhet",
    "Lav friskhet",
    "Middels friskhet",
    "Middels friskhet",
    "God friskhet",
    "God friskhet",
    "Frisk",
    "Frisk",
    "Svært frisk",
    "Svært frisk",
  ],
  sweetness: [
    "Ingen",
    "Tørr",
    "Tørr",
    "Litt sødme",
    "Litt sødme",
    "Middels søt",
    "Middels søt",
    "Søtlig",
    "Søtlig",
    "Søt",
    "Søt",
    "Svært søt",
    "Svært søt",
  ],
  tannins: [
    "Ingen",
    "Svært lite snerp",
    "Svært lite snerp",
    "Lite snerp",
    "Lite snerp",
    "Middels snerp",
    "Middels snerp",
    "God snerp",
    "God snerp",
    "Fast",
    "Fast",
    "Svært snerpende",
    "Svært snerpende",
  ],
  bitterness: [
    "Ingen",
    "Svært lav bitterhet",
    "Svært lav bitterhet",
    "Lite bitterhet",
    "Lite bitterhet",
    "Middels bitterhet",
    "Middels bitterhet",
    "God bitterhet",
    "God bitterhet",
    "Ekstra bitter",
    "Ekstra bitter",
    "Svært bitter",
    "Svært bitter",
  ],
};

const TastePie = ({percent, size}: {percent: number; size: string}) => {
  return (
    <div
      className={`aspect-square border-2 border-slate-25 dark:border-gray-900 ring-2 ring-[#1a3363] rounded-full`}
      style={{
        height: size,
        width: size,
        background: `conic-gradient(#1a3363 0% ${percent}%, #fbfcfd ${percent}%)`,
      }}
    />
  );
};

export default TastePie;
