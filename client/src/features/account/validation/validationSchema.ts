import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .max(100, "Brukernavn kan max være 100 bokstaver.")
    .required("Brukernavn er påkrevd."),
  password: yup
    .string()
    .max(32, "Passordlengden kan max være på 32 bokstaver/symboler")
    .required("Passord er påkrevd."),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Brukernavn må minst være 3 bokstaver.")
    .max(100, "Brukernavn kan max være 100 bokstaver.")
    .required("Brukernavn er påkrevd."),
  email: yup
    .string()
    .email("E-postaddressen må være gyldig.")
    .max(100, "E-postaddresse kan max være 100 bokstaver.")
    .required("E-postaddresse er påkrevd."),
  password: yup.string().required("Passord er påkrevd."),
  passwordConfirmation: yup
    .string()
    .required("Passord er påkrevd.")
    .oneOf([yup.ref("password"), null], "Passord må være like."),
});
