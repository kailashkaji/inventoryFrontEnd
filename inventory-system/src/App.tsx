import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/_App.tsx";
import Main from "./components/layouts/Main.tsx";
import SignIn from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import PrivateRoutes from "./utills/PrivateRoute.tsx";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Supplier from "./pages/supplier.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<AuthOutlet fallbackPath="/sign-in" />}>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              index
              element={<Navigate to="/dashboard" replace={true} />}
            />
            <Route element={<Main />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/supplier" element={<Supplier />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
