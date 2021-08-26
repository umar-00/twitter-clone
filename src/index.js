import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    {/* <StateProvider initialState={initialState} reducer={reducer}> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    {/* </StateProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
