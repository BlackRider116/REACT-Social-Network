import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form'

const SET_AUTH = "/auth/me/SET_AUTH";

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

const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_AUTH, payload: { userId, email, login, isAuth } });

export const getAuthThunk = () => (dispatch) => {
  return authAPI.getAuth()
    .then(response => {
      if (!response.data.resultCode) {
        const { id, email, login } = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
}

export const login = (email, password, rememberMe) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe)

  if (!response.data.resultCode) {
    dispatch(getAuthThunk());
  } else {
    let error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
    dispatch(stopSubmit('login', { _error: error }))
  }
}

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout()

  if (!response.data.resultCode) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}


export default reduceAuth;
