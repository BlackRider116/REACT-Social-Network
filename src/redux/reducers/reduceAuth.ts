import { authAPI } from "../../api/api";
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from '../reduxStore';
import { stopSubmit } from "redux-form";

const SET_AUTH = "/auth/me/SET_AUTH";
const SET_CAPTCHA = "/auth/me/GET_CAPTCHA";

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null
};
type InitialStateType = typeof initialState

const reduceAuth = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = SetAuthUserDataType | SetCaptchaUrlType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

type SetAuthUserDataType = { type: typeof SET_AUTH, payload: { userId: number | null, email: string | null, login: string | null, isAuth: boolean } }
const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => ({ type: SET_AUTH, payload: { userId, email, login, isAuth } });

export const getAuthThunk = (): ThunkType => (dispatch) => {
  return authAPI.getAuth()
    .then((response: any) => {
      if (!response.data.resultCode) {
        const { id, email, login } = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(getAuthThunk());
  } else {
    let error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
   //@ts-ignore
    dispatch(stopSubmit('login', { _error: error }))
    if (response.data.resultCode === 10) {
      dispatch(getCaptha())
    }
  }
}

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout()

  if (!response.data.resultCode) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

type SetCaptchaUrlType = { type: typeof SET_CAPTCHA, payload: { captchaUrl: string } }
const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({ type: SET_CAPTCHA, payload: { captchaUrl } });

export const getCaptha = (): ThunkType => async (dispatch) => {
  const response = await authAPI.getCaptcha()
  const captchaUrl = response.data.url
  dispatch(setCaptchaUrl(captchaUrl))
}

export default reduceAuth;
