export const initialState = {
  user: null,
  token: null,
  userId: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_USERID: "SET_USERID",
};

const reducer = (state, action) => {
  //   console.log(action);
  //   console.log(state);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case actionTypes.SET_USERID:
      return {
        ...state,
        userId: action.userId,
      };

    default:
      return state;
  }
};

export default reducer;
