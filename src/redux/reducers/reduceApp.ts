import { getAuthThunk } from "./reduceAuth";
import { ThunkAction } from 'redux-thunk';
import { GlobalStateType, InferActionsTypes } from '../reduxStore';

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
type ActionsTypes = InferActionsTypes<typeof actionsApp>
type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>

const actionsApp = {
setInitialization: () => ({ type: INITIALIZED_SUCCESS }as const),
setGlobalError: (globalError: any) => ({ type: GLOBAL_ERROR, globalError }as const)

}

export const initializeApp = (): ThunkType => async (dispatch) => {
  const promise = dispatch(getAuthThunk())
  promise.finally(() => {
    dispatch(actionsApp.setInitialization())
  })
}

export const globalErrorThunk = (): ThunkType => async (dispatch) => {
  const promise = dispatch(getAuthThunk())
  promise.finally(() => {
    dispatch(actionsApp.setGlobalError(null))
  })
}

export default reduceApp;
