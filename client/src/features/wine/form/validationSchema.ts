import { formatDate } from "../../../app/util/format";
import { z } from "zod";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

const zeroToNull = (val: number | null) => (val === 0 ? null : val);

// date should not be greater than 'tomorrow'
const checkDate = (date: Date | null): boolean => !date || date <= tomorrow;

const checkValidDrinkingWindow = (
  min: number | null,
  max: number | null
): boolean => {
  return min === null || max === null || min < max;
};

export const wineSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Navn på vin må minst være 3 bokstaver.")
    .max(120, "Navn på vin kan max være 120 bokstaver."),
  type: z.string().trim().max(20, "Type kan max være 20 bokstaver."),
  year: z
    .number()
    .int("Årgang må være et heltall.")
    .min(0, "Årgang kan kun være mellom 0 og 3000.")
    .max(3000, "Årgang kan kun være mellom 0 og 3000.")
    .nullable()
    .transform(zeroToNull),
  price: z
    .number()
    .int("Pris må være et heltall.")
    .max(1000000, "Pris kan max være 1 000 000 kr.")
    .min(0)
    .nullable()
    .transform(zeroToNull),
  alcoholContent: z
    .number()
    .max(100, "Alkoholinnhold kan kun være mellom 0 og 100 prosent.")
    .min(0, "Alkoholinnhold kan kun være mellom 0 og 100 prosent.")
    .nullable()
    .transform(zeroToNull),
  volume: z
    .number()
    .max(100, "Volum kan kun være mellom 0 og 100 liter.")
    .min(0, "Volum kan kun være mellom 0 og 100 liter.")
    .nullable()
    .transform(zeroToNull),

  /* Taste Values */
  bitterness: z
    .number()
    .min(0, "Verdien til Bitterhet må være et tall mellom 0 og 12.")
    .max(12, "Verdien til Bitterhet må være et tall mellom 0 og 12."),
  sweetness: z
    .number()
    .min(0, "Verdien til Sødme må være et tall mellom 0 og 12.")
    .max(12, "Verdien til Sødme må være et tall mellom 0 og 12."),
  freshness: z
    .number()
    .min(0, "Verdien til Ferskhet må være et tall mellom 0 og 12.")
    .max(12, "Verdien til Ferskhet må være et tall mellom 0 og 12."),
  fullness: z
    .number()
    .min(0, "Verdien til Fylde må være et tall mellom 0 og 12.")
    .max(12, "Verdien til Fylde må være et tall mellom 0 og 12."),
  tannins: z
    .number()
    .min(0, "Verdien til Tanninsk må være et tall mellom 0 og 12.")
    .max(12, "Verdien til Tanninsk må være et tall mellom 0 og 12."),

  country: z
    .string()
    .trim()
    .max(70, "Land kan max være 70 bokstaver.")
    .nullable(),
  region: z
    .string()
    .trim()
    .max(70, "Distrikt kan max være 70 bokstaver.")
    .nullable(),
  subRegion: z
    .string()
    .trim()
    .max(70, "Underdistrikt kan max være 70 bokstaver.")
    .nullable(),
  manufacturerName: z
    .string()
    .trim()
    .max(70, "Produsent kan max være 70 bokstaver.")
    .nullable(),
  storagePotential: z
    .string()
    .trim()
    .max(70, "Lagringsgrad kan max være 70 bokstaver.")
    .nullable(),
  productId: z
    .string()
    .trim()
    .max(70, "Produktnummer kan max være 24 bokstaver.")
    .nullable(),
  taste: z
    .string()
    .trim()
    .max(500, "Smak kan max være 500 bokstaver.")
    .nullable(),
  grapes: z.array(z.string()).nullable(),
  recommendedFood: z.array(z.string()).nullable(),
  odour: z
    .string()
    .trim()
    .max(500, "Duft kan max være 500 bokstaver.")
    .nullable(),
  colour: z
    .string()
    .trim()
    .max(500, "Farge kan max være 500 bokstaver.")
    .nullable(),

  /* File properties */
  resetImage: z.boolean().default(false),
  file: z
    .instanceof(File)
    .nullable()
    .refine((file) => !file || file?.size <= 500000, "Max file size is 5MB.")
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file?.type
        ),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),

  /* User Details */
  userDetails: z
    .object({
      quantity: z
        .number()
        .int("Antall må være et heltall")
        .min(0, "Antall må være mellom 0 og 1000.")
        .max(1000, "Antall må være mellom 0 og 1000."),
      score: z
        .number()
        .int("Karakter må være et heltall")
        .min(50, "Karakter kan kun være mellom 50 og 100.")
        .max(100, "Karakter kan kun være mellom 50 og 100.")
        .nullable(),
      drinkingWindowMin: z
        .number()
        .min(0, "Drikkevindu må være mellom 0 og 3000.")
        .max(3000, "Drikkevindu må være mellom 0 og 3000.")
        .nullable(),
      drinkingWindowMax: z
        .number()
        .min(0, "Drikkevindu-til må være høyere eller lik drikkevindu-fra.")
        .max(3000, "Drikkevindu må være mellom 0 og 3000.")
        .nullable(),
      userRating: z
        .number()
        .int("Vurdering må være et heltall")
        .min(0, "Vurdering må være ett tall mellom 0 og 10.")
        .max(10, "Vurdering må være ett tall mellom 0 og 10.")
        .nullable(),
      userNote: z
        .string()
        .trim()
        .max(500, "Dine notater kan max være 500 bokstaver.")
        .nullable(),
      purchaseDate: z
        .date()
        .nullable()
        .refine(
          checkDate,
          `Kjøpsdato må være mindre enn ${formatDate(tomorrow)}`
        ),
      purchaseLocation: z
        .string()
        .trim()
        .max(70, "Kjøpested kan max være 70 bokstaver.")
        .nullable(),
      favorite: z.boolean().default(false),
    })
    .refine(
      (data) =>
        checkValidDrinkingWindow(
          data.drinkingWindowMin,
          data.drinkingWindowMax
        ),
      {
        message: "Drikkevindu-til må være høyere eller lik drikkevindu-fra.",
        path: ["drinkingWindowMax"],
      }
    ),
});

// Infer the TS type according to the zod schema.
export type WineFormData = z.infer<typeof wineSchema>;
