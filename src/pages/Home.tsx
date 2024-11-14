import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/async-actions/authActions";

export default function Home() {
  const { user, loading, authError } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-screen justify-center items-center gap-4">
      <div className="flex flex-col gap-2">
        <p>First name: {user?.firstName}</p>
        <p>Last name: {user?.lastName}</p>
        <p>Email: {user?.email}</p>
        <p>Phone number: {user?.phoneNumber}</p>
        <button
          disabled={loading}
          onClick={() => dispatch(logout())}
          className="bg-blue-700 text-white rounded-sm py-1">
          {loading ? "Logging out..." : "Logout"}
        </button>
        <p className="text-sm text-red-700">{authError}</p>
      </div>
    </div>
  );
}
