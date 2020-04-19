import { authAPI, profileAPI } from "../../api/api";
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType, InferActionsTypes } from '../reduxStore';
import { stopSubmit } from "redux-form";

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null,
  avatar: null as string | null
};
type InitialStateType = typeof initialState

const reduceAuth = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case '/auth/me/SET_AUTH':
    case '/auth/me/SET_CAPTCHA':
    case "/auth/AVATAR":
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actionsAuth>
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

export const actionsAuth = {
  setCaptchaUrl: (captchaUrl: string) => ({ type: '/auth/me/SET_CAPTCHA', payload: { captchaUrl } } as const),
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: '/auth/me/SET_AUTH', payload: { userId, email, login, isAuth } } as const),
  setAvatar: (avatar: string | null) => ({ type: '/auth/AVATAR', payload: { avatar } } as const)
}

export const getAuthThunk = (): ThunkType => (dispatch) => {
  return authAPI.getAuth()
    .then((response: any) => {
      if (!response.data.resultCode) {
        const { id, email, login } = response.data.data
        dispatch(actionsAuth.setAuthUserData(id, email, login, true));
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

export const setAvatarThunk = (): ThunkType => async (dispatch, getState) => {
  const myId = getState().auth.userId
  if (myId !== null) {
    const response = await profileAPI.getProfile(myId)
    if (response.status === 200) {
      dispatch(actionsAuth.setAvatar(response.data.photos.small))
    }
  }
}

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout()

  if (!response.data.resultCode) {
    dispatch(actionsAuth.setAuthUserData(null, null, null, false));
    dispatch(actionsAuth.setAvatar(null))
  }
}

export const getCaptha = (): ThunkType => async (dispatch) => {
  const response = await authAPI.getCaptcha()
  const captchaUrl = response.data.url
  dispatch(actionsAuth.setCaptchaUrl(captchaUrl))
}

export default reduceAuth;
