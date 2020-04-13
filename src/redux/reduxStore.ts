
import { createStore, combineReducers, applyMiddleware } from "redux";
import reduceDialogs from "./reduceDialogs";
import reduceProfile from "./reduceProfile";
import reduceUsers from "./reduceUsers";
import reduceAuth from "./reduceAuth";
import thunkMiddleware from "redux-thunk";
//@ts-ignore
import { reducer as formReducer } from 'redux-form';
import reduceApp from "./reduceApp";
import reduceNews from "./reduceNews";

let rootReducer = combineReducers({
  messagesPage: reduceDialogs,
  profilePage: reduceProfile,
  usersPage: reduceUsers,
  auth: reduceAuth,
  form: formReducer,
  app: reduceApp,
  news: reduceNews
});

type RootReducerType = typeof rootReducer
export type GlobalStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;

export default store;
