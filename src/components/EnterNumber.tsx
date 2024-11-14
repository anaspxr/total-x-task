import { useFormik } from "formik";
import { phoneSchema } from "../utils/yupSchema";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sendOtp } from "../store/async-actions/authActions";

// 8555809849 test number
export default function EnterNumber() {
  const dispatch = useAppDispatch();
  const { authError, loading } = useAppSelector((state) => state.user);

  // Formik setup
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { phone: "" },
      validationSchema: phoneSchema,
      onSubmit: async (values) => {
        const phoneNumber = `+91 ${values.phone}`;
        await dispatch(sendOtp(phoneNumber));
      },
    });

  return (
    <div>
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-zinc-800 my-4">Login</h2>
        <p className="text-zinc-800 text-sm">
          Login to access to your travelwise account
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:w-[600px] gap-4 max-w-md mb-2">
        {authError && <p className="text-red-600 text-sm">{authError}</p>}
        <div className="relative">
          <label
            htmlFor="phone"
            className="text-xs absolute -top-2 bg-white px-1 left-2">
            Enter your mobile number
          </label>
          <input
            className="border border-zinc-400 rounded-sm w-full h-10 px-2"
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            required
          />
          {touched.phone && errors.phone ? (
            <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
          ) : null}
        </div>
        <button
          className="rounded-sm h-10 bg-blue-500 hover:bg-opacity-90 text-white "
          type="submit"
          disabled={loading}>
          {loading ? "Processing..." : "Get OTP"}
        </button>
      </form>
      <div id="recaptcha-container" className="w-fit m-auto"></div>
      <p className="text-center text-sm my-2">
        Don't have an account?{" "}
        <span className="text-red-400 cursor-pointer hover:underline">
          Sign Up
        </span>
      </p>
    </div>
  );
}
