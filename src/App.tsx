import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { auth } from "./firebase/setup";
import { useAuthState } from "react-firebase-hooks/auth";
import PrivateRoute from "./components/PrivateRoute";
import PersistLogin from "./components/PersistLogin";

function App() {
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <PersistLogin>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </PersistLogin>
  );
}

export default App;
