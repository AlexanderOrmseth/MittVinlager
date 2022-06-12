// gets image from vinmonopolet or a placeholder image
export const vinmonopoletImage = (
  id: string | null | undefined,
  size: number
) =>
  id
    ? `https://bilder.vinmonopolet.no/cache/${size}x${size}-0/${id}-1.jpg`
    : placeholder;

// link to vinmonopolet wine
export const vinmonopoletLink = (id: string) =>
  `https://www.vinmonopolet.no/p/${id}`;

// placeholder image
export const placeholder =
  "https://res.cloudinary.com/djfkqypit/image/upload/v1655034560/bottle_li9ari.png";
