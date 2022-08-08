import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";
import { BrowserRouter } from "react-router-dom";
import ToastManager from "./app/layout/ToastManager";
import ScrollToTop from "./app/layout/ScrollToTop";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastManager />
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
