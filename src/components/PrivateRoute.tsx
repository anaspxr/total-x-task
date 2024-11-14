import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/setup";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PrivateRoute() {
  const [user] = useAuthState(auth);

  return user ? <Outlet /> : <Navigate to="/login" />;
}
