import { authAPI } from "../api/api";

const SET_AUTH = "SET_AUTH";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
};

const reduceAuth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        userId: action.data.id,
        email: action.data.email,
        login: action.data.login,
        isAuth: true,
      };

    default:
      return state;
  }
};

const setAuthUserData = (data) => ({
  type: SET_AUTH,
  data
});

export const getAuthThunk = () => {
  return (dispatch) => {
    authAPI.getAuth().then(data => {
      dispatch(setAuthUserData(data.data));
    });
  }
}

export default reduceAuth;
