import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";

const renderStrict = {
  on: (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  ),
  off: (
    <Provider store={store}>
      <App />
    </Provider>
  ),
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>{renderStrict.off}</>
);
