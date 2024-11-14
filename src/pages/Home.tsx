import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function Home() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="flex h-screen justify-center items-center gap-4">
      <div className="flex flex-col gap-2">
        <p>First name: {user?.firstName}</p>
        <p>Last name: {user?.lastName}</p>
        <p>Email: {user?.email}</p>
        <p>Phone number: {user?.phoneNumber}</p>
        <button className="bg-blue-700 text-white rounded-sm py-1">
          Logout
        </button>
      </div>

      <Link to="/profile">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
          Profile
        </button>
      </Link>
      <Link to="/login">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
          Login
        </button>
      </Link>
    </div>
  );
}
