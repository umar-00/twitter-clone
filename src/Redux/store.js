import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userAuthReducer from "./Slices/userAuthSlice";

const persistConfig = {
  key: "root",
  storage,
};

// create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userAuthReducer);

// export const store = configureStore({
//   reducer: { userAuth: userAuthReducer },
// });

export default configureStore({
  reducer: persistedReducer,
});
