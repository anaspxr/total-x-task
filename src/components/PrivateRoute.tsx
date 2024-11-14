import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function PrivateRoute() {
  const { user } = useAppSelector((state) => state.user);

  return user?.email ? <Outlet /> : <Navigate to="/login" />;
}
