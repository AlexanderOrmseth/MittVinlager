export const formatDate = (date: Date, short = false) => {
  // empty string if date is not a date
  if (!date || typeof date.getMonth !== "function") return "";

  const months = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const month = short
    ? months[date.getMonth()].substring(0, 3)
    : months[date.getMonth()];

  return `${date.getDate()}. ${month} ${date.getFullYear()}`;
};

export const formatVolume = (volume: number | null | undefined): string => {
  return volume ? `${volume * 100} cl` : "";
};

export const formatAlcoholContent = (ac: number | null | undefined): string =>
  ac ? `${ac}%` : "";

export const formatPrice = (price: number | null | undefined) => {
  if (price == null || isNaN(price)) return "0 kr";
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " kr";
};
