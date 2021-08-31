import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: 0,
  userId: null,
};

const userGoogleAuthSlice = createSlice({
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

export const { setUser, setIsLoggedIn, setUserId } =
  userGoogleAuthSlice.actions;

export default userGoogleAuthSlice.reducer;
