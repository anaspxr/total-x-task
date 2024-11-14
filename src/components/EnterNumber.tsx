import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase/setup";
import { useState } from "react";

export default function EnterNumber() {
  const [otpConfirmation, setOtpConfirmation] = useState<ConfirmationResult>();

  const handleGetOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = "+91 8555809849";
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setOtpConfirmation(confirmation);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(otpConfirmation);

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold text-zinc-800">Login</h2>
        <p className="text-zinc-800 text-sm">
          Login to access to your travelwise account{" "}
        </p>
      </div>
      <form onSubmit={handleGetOtp} className="flex flex-col gap-8 max-w-md">
        <div className="relative">
          <label
            htmlFor="phone"
            className="text-xs absolute -top-2 bg-white px-1 left-2">
            Enter your mobile number{" "}
          </label>
          <input
            className="border border-zinc-400 rounded-sm w-full h-10"
            type="tel"
            id="phone"
            name="phone"
            required
          />
        </div>
        <button
          className="rounded-sm h-10 bg-blue-500 hover:bg-opacity-90 text-white "
          type="submit">
          Get OTP
        </button>
      </form>

      <div id="recaptcha-container"></div>
    </div>
  );
}
