import { useFormik } from "formik";
import { otpSchema } from "../utils/yupSchema";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAuthStatus } from "../store/slices/userSlice";
import { verifyOtp } from "../store/async-actions/authActions";
import InputBox from "./ui/InputBox";

// 8555809849 test number
export default function VerifyOtp() {
  const dispatch = useAppDispatch();
  const { authError, loading, verificationId } = useAppSelector(
    (state) => state.user
  );

  // Formik setup
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { otp: "" },
      validationSchema: otpSchema,
      onSubmit: async (values) => {
        // if (!verificationId) return;
        await dispatch(verifyOtp({ otp: values.otp, verificationId }));
      },
    });

  return (
    <div>
      <div className="mb-16">
        <p
          className="flex items-center gap-4 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={() => dispatch(setAuthStatus("login"))}>
          <span className="text-3xl">{"<"}</span> <span>Back to login</span>
        </p>
        <h2 className="text-3xl font-semibold text-zinc-800 my-4">
          Verify Code
        </h2>
        <p className="text-zinc-800 text-sm">
          An authentication code has been sent to your mobile number
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:w-[600px] gap-4 max-w-md mb-2">
        {authError && <p className="text-red-600 text-sm">{authError}</p>}
        <InputBox
          label="Enter Code"
          id="otp"
          name="otp"
          value={values.otp}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.otp}
          touched={touched.otp}
        />
        <p className="text-sm my-2">
          Didn't receive the code?{" "}
          <span className="text-red-400 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
        <button
          className="rounded-sm h-10 bg-blue-500 hover:bg-opacity-90 text-white "
          type="submit"
          disabled={loading}>
          {loading ? "Processing..." : "Verify OTP"}
        </button>
      </form>
      <div id="recaptcha-container" className="w-fit m-auto"></div>
    </div>
  );
}
