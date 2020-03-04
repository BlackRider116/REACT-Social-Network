
import { createStore, combineReducers, applyMiddleware } from "redux";
import reduceDialogs from "./reduceDialogs";
import reduceProfile from "./reduceProfile";
import reduceUsers from "./reduceUsers";
import reduceAuth from "./reduceAuth";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import reduceApp from "./reduceApp";

let reducers = combineReducers({
  messagesPage: reduceDialogs,
  profilePage: reduceProfile,
  usersPage: reduceUsers,
  auth: reduceAuth,
  form: formReducer,
  app: reduceApp,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
