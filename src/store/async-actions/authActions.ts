import { createAsyncThunk } from "@reduxjs/toolkit";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/setup";

const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );
      return confirmation;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to send OTP");
    }
  }
);

export { sendOtp };
