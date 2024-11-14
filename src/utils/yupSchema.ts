import { object, string } from "yup";

export const phoneSchema = object({
  phone: string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid phone number")
    .required("Phone number is required"),
});
