import { useAppDispatch } from "../store/hooks";
import Spinner from "./ui/loader/Spinner";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/setup";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { setUserData } from "../store/slices/userSlice";

export default function PersistLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const usersRef = collection(db, "users");

          // Query for a document where the phoneNumber field matches the user's phone number
          const q = query(
            usersRef,
            where("phoneNumber", "==", user.phoneNumber)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            dispatch(setUserData(querySnapshot.docs[0].data()));
          } else {
            console.log("No matching user found.");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      }
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
