import { boolean, object, string } from "yup";

export const phoneSchema = object({
  phone: string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid phone number")
    .required("Phone number is required"),
});

export const otpSchema = object({
  otp: string()
    .matches(/^\d{6}$/, "Enter a valid OTP")
    .required("OTP is required"),
});

export const RegisterSchema = object().shape({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().email("Invalid email").required("Email is required"),
  terms: boolean().oneOf([true], "You must accept the terms and conditions"),
});
