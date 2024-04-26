import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

console.warn(store);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
