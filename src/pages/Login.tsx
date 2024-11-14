import { useEffect } from "react";
import EnterNumber from "../components/EnterNumber";
import Register from "../components/Register";
import VerifyOtp from "../components/VerifyOtp";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { authStatus, user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
