import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/setup";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user?.email ? <Outlet /> : <Navigate to="/login" />;
}
