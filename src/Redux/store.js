import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userGoogleAuthSlice from "./Slices/userGoogleAuthSlice";

const persistConfig = {
  key: "root",
  storage,
};

// create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userGoogleAuthSlice);

// export const store = configureStore({
//   reducer: { userAuth: userAuthReducer },
// });

export default configureStore({
  reducer: persistedReducer,
});
