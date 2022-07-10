import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

// RTK
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
