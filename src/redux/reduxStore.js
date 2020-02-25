
import { createStore, combineReducers, applyMiddleware } from "redux";
import reduceDialogs from "./reduceDialogs";
import reduceProfile from "./reduceProfile";
import reduceFriend from "./reduceFriends";
import reduceUsers from "./reduceUsers";
import reduceAuth from "./reduceAuth";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
  messagesPage: reduceDialogs,
  profilePage: reduceProfile,
  friendsPage: reduceFriend,
  usersPage: reduceUsers,
  auth: reduceAuth,
  form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
