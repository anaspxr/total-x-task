import { createSlice } from "@reduxjs/toolkit";
import { sendOtp } from "../async-actions/authActions";

interface UserState {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  } | null;
  authStatus: "login" | "otpSent" | "otpVerified";
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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.authError = null;
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.authStatus = "otpSent";
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.authError = action.payload as string;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
