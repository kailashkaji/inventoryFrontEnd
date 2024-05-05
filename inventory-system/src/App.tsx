import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/_App.tsx";
import Main from "./components/layouts/Main.tsx";
import SignIn from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import PrivateRoutes from "./utills/PrivateRoute.tsx";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
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
            <Route element={<Main children />}>
              <Route path="/dashboard" element={<Home />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      {/* use this code after authentication and add some files too */}
      {/* <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={LoginPage}/>
        <PrivateRoute path="/home" component={Dashboard} />
        </Switch> */}
    </BrowserRouter>
  );
}

export default App;
