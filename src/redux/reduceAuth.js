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
        ...action.payload
      };

    default:
      return state;
  }
};

const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_AUTH, payload: { userId, email, login, isAuth} });

export const getAuthThunk = () => {
  return (dispatch) => {
    authAPI.getAuth().then(response => {
      if (!response.data.resultCode) {
        const { id, email, login } = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  }
}

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe)
    .then(response => {
      if (!response.data.resultCode) {
        dispatch(getAuthThunk());
      }
    });
}

export const logout = () => (dispatch) => {
  authAPI.logout()
    .then(response => {
      if (!response.data.resultCode) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
}


export default reduceAuth;
