import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./ReduxManager/store.js";
import { saveState } from "./LocalStorage.js";
import FirebaseProvider from "./context/Firebase.jsx";

const root = createRoot(document.getElementById("root"));

// Save store to local storage
store.subscribe(() => {
  saveState(store.getState());
});

root.render(
  <Provider store={store}>
    <StrictMode>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </StrictMode>
  </Provider>
);
