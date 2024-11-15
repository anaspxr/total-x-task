import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
} from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, db } from "../../firebase/setup";
import { FirebaseError } from "firebase/app";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  or,
} from "firebase/firestore";

const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const usersRef = collection(db, "users");
      const altNo = `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;

      // Query for a document where the phoneNumber field matches the user's phone number
      const q = query(
        usersRef,
        or(
          where("phoneNumber", "==", phoneNumber),
          where("phoneNumber", "==", altNo)
        )
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log(querySnapshot.docs[0].data());
        return querySnapshot.docs[0].data() as {
          firstName: string;
          lastName: string;
          email: string;
          phoneNumber: string;
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching user document:", error);
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async (phoneNumber: string, { rejectWithValue }) => {
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );
      recaptcha.clear();
      return { phoneNumber, verificationId: confirmation.verificationId };
    } catch (error) {
      recaptcha.clear();
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

const logout = createAsyncThunk("user/logout", async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
});

export { sendOtp, verifyOtp, registerUser, logout, fetchUserData };
