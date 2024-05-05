import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "antd/dist/reset.css";
import AuthProvider from "react-auth-kit";
import { authStore } from "./utills/refresh.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider store={authStore}>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
