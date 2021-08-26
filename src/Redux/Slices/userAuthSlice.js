import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  user: null,
  isLoggedIn: 0,
  userId: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { setUser, setIsLoggedIn, setUserId } = userAuthSlice.actions;

export default userAuthSlice.reducer;
