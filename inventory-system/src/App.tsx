import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/_App.tsx";
import Main from "./components/layouts/Main.tsx";
import SignIn from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import PrivateRoutes from "./utills/PrivateRoute.tsx";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Supplier from "./pages/supplier.tsx";
import Brand from "./pages/brand.tsx";
import Category from "./pages/category.tsx";
import Product from "./pages/product.tsx";
import Items from "./pages/item.tsx";
import Orders
 from "./pages/order.tsx";
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
              <Route path="/brand" element={<Brand />} />
              <Route path="/category" element={<Category />} />
              <Route path="/product" element={<Product />} />
              <Route path="/item" element={<Items />} />
              <Route path="/order" element={<Orders />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
