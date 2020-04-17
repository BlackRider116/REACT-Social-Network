
import { createStore, combineReducers, applyMiddleware } from "redux";
import reduceDialogs from "./reducers/reduceDialogs";
import reduceProfile from "./reducers/reduceProfile";
import reduceUsers from "./reducers/reduceUsers";
import reduceAuth from "./reducers/reduceAuth";
import thunkMiddleware from "redux-thunk";
//@ts-ignore
import { reducer as formReducer } from 'redux-form';
import reduceApp from "./reducers/reduceApp";
import reduceNews from "./reducers/reduceNews";

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

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>


let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;

export default store;
