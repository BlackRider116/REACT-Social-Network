import { getAuthThunk } from "./reduceAuth";

const INITIALIZED_SUCCESS = "/auth/me/INITIALIZED_SUCCESS";

const initialState = {
  initialized: false,
};

const reduceApp = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
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



export default reduceApp;
