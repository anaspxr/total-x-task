import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center gap-4">
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
