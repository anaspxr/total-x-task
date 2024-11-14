import EnterNumber from "../components/EnterNumber";
import Register from "../components/Register";
import VerifyOtp from "../components/VerifyOtp";
import { useAppSelector } from "../store/hooks";

export default function Login() {
  const { authStatus } = useAppSelector((state) => state.user);

  return (
    <div className="flex h-screen items-center justify-center">
      {authStatus === "otpSent" ? (
        <VerifyOtp />
      ) : authStatus === "otpVerified" ? (
        <Register />
      ) : (
        <EnterNumber />
      )}
    </div>
  );
}
