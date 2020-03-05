
import { createStore, combineReducers, applyMiddleware } from "redux";
import reduceDialogs from "./reduceDialogs";
import reduceProfile from "./reduceProfile";
import reduceUsers from "./reduceUsers";
import reduceAuth from "./reduceAuth";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import reduceApp from "./reduceApp";
import reduceNews from "./reduceNews";

let reducers = combineReducers({
  messagesPage: reduceDialogs,
  profilePage: reduceProfile,
  usersPage: reduceUsers,
  auth: reduceAuth,
  form: formReducer,
  app: reduceApp,
  news: reduceNews
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
