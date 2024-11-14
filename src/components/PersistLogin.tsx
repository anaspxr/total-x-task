import { useAppDispatch } from "../store/hooks";
import Spinner from "./ui/loader/Spinner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/setup";
import { useEffect, useState } from "react";
import { fetchUserData } from "../store/async-actions/authActions";

export default function PersistLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user?.phoneNumber) {
        setLoading(false);
        return;
      }

      await dispatch(fetchUserData(user.phoneNumber));
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return <>{children}</>;
}
