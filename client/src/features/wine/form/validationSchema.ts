import {formatDate} from "./../../../app/util/format";
import * as yup from "yup";

const emptyStringToNull = (value: string, originalValue: string) => {
  if (typeof originalValue === "string" && originalValue === "") {
    return null;
  }
  return value;
};

const today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

export const schema = yup.object().shape({
  /* required */
  name: yup
    .string()
    .trim()
    .required("Navn på vin er påkrevd.")
    .min(3, "Navn på vin må minst være 3 bokstaver.")
    .max(120, "Navn på vin kan max være 120 bokstaver."),
  type: yup
    .string()
    .trim()
    .required("Type er påkrevd.")
    .max(20, "Type kan max være 20 bokstaver."),

  /* Numbers */
  year: yup
    .number()
    .integer("Årgang må være et heltall")
    .typeError("Årgang må være et tall.")
    .nullable(true)
    .transform(emptyStringToNull)
    .min(0, "Årgang må være over år 0.")
    .max(3000, "Årgang må være under år 3000."),
  alcoholContent: yup
    .number()
    .integer("Alkoholinnhold må være et heltall")
    .typeError("Alkoholinnhold må være et tall.")
    .nullable()
    .transform(emptyStringToNull)
    .min(0, "Alkoholinnhold kan kun være mellom 0 og 100 prosent.")
    .max(100, "Alkoholinnhold kan kun være mellom 0 og 100 prosent."),
  volume: yup
    .number()
    .typeError("Volum må være et tall.")
    .nullable()
    .transform(emptyStringToNull)
    .min(0, "Volum kan kun være mellom 0 og 100 liter.")
    .max(100, "Volum kan kun være mellom 0 og 100 liter."),
  price: yup
    .number()
    .integer("Pris må være et heltall")
    .typeError("Volum må være et tall.")
    .nullable()
    .transform(emptyStringToNull)
    .min(0, "Pris kan ikke være under 0.")
    .max(1000000, "Pris kan max være 1 000 000 kr."),
  // taste values
  bitterness: yup
    .number()
    .typeError("Bitterhet må ha en verdi.")
    .nullable(false)
    .min(0, "Verdien til Bitterhet må være ett tall mellom 0 og 12.")
    .max(12, "Verdien til Bitterhet må være ett tall mellom 0 og 12."),
  sweetness: yup
    .number()
    .typeError("Sødme må ha en verdi.")
    .nullable(false)
    .min(0, "Verdien til Sødme må være ett tall mellom 0 og 12.")
    .max(12, "Verdien til Sødme må være ett tall mellom 0 og 12."),
  freshness: yup
    .number()
    .typeError("Ferskhet må ha en verdi.")
    .nullable(false)
    .min(0, "Verdien til Ferskhet må være ett tall mellom 0 og 12.")
    .max(12, "Verdien til Ferskhet må være ett tall mellom 0 og 12."),
  fullness: yup
    .number()
    .typeError("Fylde må ha en verdi.")
    .nullable(false)
    .min(0, "Verdien til Fylde må være ett tall mellom 0 og 12.")
    .max(12, "Verdien til Fylde må være ett tall mellom 0 og 12."),
  tannins: yup
    .number()
    .typeError("Tanninsk må ha en verdi.")
    .nullable(false)
    .min(0, "Verdien til Tanninsk må være ett tall mellom 0 og 12.")
    .max(12, "Verdien til Tanninsk må være ett tall mellom 0 og 12."),

  /* numbers end */

  country: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(70, "Land kan max være 70 bokstaver."),
  region: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(70, "Distrikt kan max være 70 bokstaver."),
  subRegion: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(70, "Underdistrikt kan max være 70 bokstaver."),
  manufacturerName: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(70, "Produsent kan max være 70 bokstaver."),
  storagePotential: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(70, "Lagringsgrad kan max være 70 bokstaver."),
  productId: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(70, "Produktnummer kan max være 24 bokstaver."),
  taste: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(500, "Smak kan max være 500 bokstaver."),
  grapes: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(500, "Råstoff kan max være 500 bokstaver."),
  odour: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(500, "Duft kan max være 500 bokstaver."),
  colour: yup
    .string()
    .trim()
    .nullable()
    .transform(emptyStringToNull)
    .max(500, "Farge kan max være 500 bokstaver."),

  userDetails: yup.object().shape({
    quantity: yup
      .number()
      .required("Antall må fylles ut.")
      .integer("Antall må være et heltall")
      .typeError("Antall må være et tall.")
      .min(0, "Antall må være mellom 0 og 1000.")
      .max(1000, "Antall må være mellom 0 og 1000."),
    score: yup
      .number()
      .integer("Karakter må være et heltall")
      .typeError("Karakter må være et tall.")
      .nullable()
      .transform(emptyStringToNull)
      .min(50, "Karakter kan kun være mellom 50 og 100.")
      .max(100, "Karakter kan kun være mellom 50 og 100."),
    drinkingWindowMin: yup
      .number()
      .typeError("Drikkevindu må være et tall.")
      .nullable()
      .transform(emptyStringToNull)
      .min(0, "Drikkevindu må være mellom 0 og 3000.")
      .max(3000, "Drikkevindu må være mellom 0 og 3000."),
    drinkingWindowMax: yup
      .number()
      .typeError("Drikkevindu må være et tall.")
      .nullable()
      .transform(emptyStringToNull)
      .min(
        yup.ref("drinkingWindowMin") || 0,
        "Drikkevindu-til må være høyere eller lik drikkevindu-fra."
      )
      .max(3000, "Drikkevindu må være mellom 0 og 3000."),
    userRating: yup
      .number()
      .integer("Vurdering må være et heltall")
      .typeError("Vurdering må være et tall.")
      .nullable()
      .transform(emptyStringToNull)
      .min(0, "Vurdering må være ett tall mellom 0 og 10.")
      .max(10, "Vurdering må være ett tall mellom 0 og 10."),
    userNote: yup
      .string()
      .trim()
      .nullable()
      .transform(emptyStringToNull)
      .max(500, "Dine notater kan max være 500 bokstaver."),
    purchaseDate: yup
      .date()
      .nullable()
      .max(tomorrow, `Kjøpsdato må være mindre enn ${formatDate(tomorrow)}`),
    purchaseLocation: yup
      .string()
      .trim()
      .nullable()
      .transform(emptyStringToNull)
      .max(70, "Kjøpested kan max være 70 bokstaver."),
    favorite: yup
      .bool()
      .typeError("Favoritt kan kun være 'true' / 'false'.")
      .default(false),
  }),
});
