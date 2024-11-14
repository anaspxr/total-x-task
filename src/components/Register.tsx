import { useFormik } from "formik";
import InputBox from "./ui/InputBox";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RegisterSchema } from "../utils/yupSchema";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/async-actions/authActions";

// import { registerUser } from "../store/async-actions/authActions";

export default function Register() {
  const dispatch = useAppDispatch();
  const { authError, loading, user } = useAppSelector((state) => state.user);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { firstName: "", lastName: "", email: "" },
      validationSchema: RegisterSchema,
      onSubmit: async (values) => {
        if (!user) return navigate("/login");
        await dispatch(
          registerUser({ ...values, phoneNumber: user.phoneNumber })
        );
      },
    });

  const navigate = useNavigate();

  useEffect(() => {
    // if the user is already registered, navigate to home page
    if (user?.email) {
      navigate("/");
    }
  }, [navigate, user?.email]);

  return (
    <div>
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-zinc-800 my-4">Register</h2>
        <p className="text-zinc-800 text-sm">
          Create a new account by filling in the information below.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:w-[600px] gap-4 max-w-md mb-2">
        {authError && <p className="text-red-600 text-sm">{authError}</p>}
        <InputBox
          label="First Name"
          id="firstName"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.firstName}
          touched={touched.firstName}
          required
        />
        <InputBox
          label="Last Name"
          id="lastName"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lastName}
          touched={touched.lastName}
          required
        />
        <InputBox
          label="Email"
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          required
        />
        <button
          className="rounded-sm h-10 bg-blue-500 hover:bg-opacity-90 text-white"
          type="submit"
          disabled={loading}>
          {loading ? "Registering.." : "Register"}
        </button>
      </form>
    </div>
  );
}