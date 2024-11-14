import { createSlice } from "@reduxjs/toolkit";
import { registerUser, sendOtp, verifyOtp } from "../async-actions/authActions";

interface UserState {
  user: {
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber: string;
  } | null;
  authStatus: "login" | "otpSent" | "otpVerified";
  verificationId: string | null;
  phoneNumber: string;
  authError: string | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  authError: null,
  authStatus: "login",
  phoneNumber: "",
  loading: false,
  verificationId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setAuthStatus: (
      state,
      action: {
        payload: "login" | "otpSent" | "otpVerified";
      }
    ) => {
      state.authStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.authError = null;
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.authStatus = "otpSent";
        state.verificationId = action.payload;
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.authError = action.payload as string;
        state.loading = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.authError = null;
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.authStatus = "otpVerified";
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.authError = action.payload as string;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.authError = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export const { setAuthStatus, setUserData } = userSlice.actions;
export default userSlice.reducer;
