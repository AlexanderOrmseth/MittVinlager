import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().max(100).required(),
  password: yup.string().max(32).required(),
});

export const registerSchema = yup.object().shape({
  username: yup.string().min(3).max(100).required(),
  email: yup.string().email().max(100).required(),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
