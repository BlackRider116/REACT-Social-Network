import { getAuthThunk } from "./reduceAuth";

const INITIALIZED_SUCCESS = "/auth/me/INITIALIZED_SUCCESS";
const GLOBAL_ERROR = "GLOBAL_ERROR";

const initialState = {
  initialized: false,
  globalError: null
};

const reduceApp = (state = initialState, action) => {
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

const setInitialization = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
  const promise = dispatch(getAuthThunk())
  promise.finally(() => {
    dispatch(setInitialization())
  })
}

const setGlobalError = (globalError) => ({ type: GLOBAL_ERROR, globalError });

export const globalErrorThunk = () => (dispatch) => {
  const promise = dispatch(getAuthThunk())
  promise.finally(() => {
    dispatch(setGlobalError())
  })
}

export default reduceApp;
