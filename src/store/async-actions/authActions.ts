import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
} from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, db } from "../../firebase/setup";
import { FirebaseError } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";

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
      return confirmation.verificationId;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to send OTP");
    }
  }
);

const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (
    {
      otp,
      verificationId,
    }: {
      otp: string;
      verificationId: string | null;
    },
    { rejectWithValue }
  ) => {
    try {
      if (!verificationId) throw new Error("Verification ID not found");
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const res = await signInWithCredential(auth, credential);
      const user = {
        phoneNumber: res.user.phoneNumber!,
        email: res.user.email,
      };
      return user;
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/invalid-verification-code"
      ) {
        return rejectWithValue("Invalid OTP");
      }
      return rejectWithValue("Failed to verify OTP");
    }
  }
);

const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await addDoc(collection(db, "users"), user);
      return user;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to register user");
    }
  }
);

export { sendOtp, verifyOtp, registerUser };
