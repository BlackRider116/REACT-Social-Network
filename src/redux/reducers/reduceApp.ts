import { getAuthThunk } from "./reduceAuth";
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType } from '../reduxStore';

const INITIALIZED_SUCCESS = "/auth/me/INITIALIZED_SUCCESS";
const GLOBAL_ERROR = "GLOBAL_ERROR";

const initialState = {
  initialized: false as boolean,
  globalError: null as null| any
};
type InitialStateType = typeof initialState

const reduceApp = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case GLOBAL_ERROR:
      return {
        ...state,
        globalError: action.globalError,
      };

    default:
      return state;
  }
};
type ActionsTypes = SetInitializationType | SetGlobalErrorType
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

type SetInitializationType = {type: typeof INITIALIZED_SUCCESS}
const setInitialization = (): SetInitializationType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = (): ThunkType => async (dispatch) => {
  const promise = dispatch(getAuthThunk())
  promise.finally(() => {
    dispatch(setInitialization())
  })
}

type SetGlobalErrorType = {type: typeof GLOBAL_ERROR, globalError: any}
const setGlobalError = (globalError: any): SetGlobalErrorType => ({ type: GLOBAL_ERROR, globalError });

export const globalErrorThunk = (): ThunkType => async (dispatch) => {
  const promise = dispatch(getAuthThunk())
  promise.finally(() => {
    dispatch(setGlobalError(null))
  })
}

export default reduceApp;
