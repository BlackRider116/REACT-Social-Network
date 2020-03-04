import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form'

const SET_AUTH = "/auth/me/SET_AUTH";
const SET_CAPTCHA = "/auth/me/GET_CAPTCHA";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
};

const reduceAuth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
    case SET_CAPTCHA:
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

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(getAuthThunk());
  } else {
    let error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
    dispatch(stopSubmit('login', { _error: error }))
    if (response.data.resultCode === 10) {
      dispatch(getCaptha())
    }
  }
}

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout()

  if (!response.data.resultCode) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

const setCaptchaUrl = (captchaUrl) => ({ type: SET_CAPTCHA, payload: { captchaUrl } });

export const getCaptha = () => async (dispatch) => {
  const response = await authAPI.getCaptcha()
  const captchaUrl = response.data.url
  dispatch(setCaptchaUrl(captchaUrl))
}

export default reduceAuth;
