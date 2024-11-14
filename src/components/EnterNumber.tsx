import { useFormik } from "formik";
import { phoneSchema } from "../utils/yupSchema";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sendOtp } from "../store/async-actions/authActions";
import { useState } from "react";
import InputBox from "./ui/InputBox";

// 8555809849 test number
export default function EnterNumber() {
  const dispatch = useAppDispatch();
  const [isNew, setIsNew] = useState(false);

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
        <h2 className="text-3xl font-semibold text-zinc-800 my-4">
          {isNew ? "Sign Up" : "Login"}
        </h2>
        <p className="text-zinc-800 text-sm">
          {isNew
            ? "Create a new travelwise account "
            : "Login to access to your travelwise account"}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:w-[600px] w-full gap-4 max-w-sm mb-2">
        {authError && <p className="text-red-600 text-sm">{authError}</p>}
        <InputBox
          error={errors.phone}
          touched={touched.phone}
          label="Enter Phone Number"
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
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
        <span
          onClick={() => setIsNew(!isNew)}
          className="text-red-400 cursor-pointer hover:underline">
          {isNew ? "Login" : "Sign Up"}
        </span>
      </p>
    </div>
  );
}
