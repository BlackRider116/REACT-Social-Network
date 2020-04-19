import React, { ComponentType } from "react";
import classes from "./App.module.scss";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import Setting from "./components/Setting/Setting";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/reducers/reduceApp";
import Preloader from "./common/Preloader/Preloader";

import withSuspense from "./hoc/withSuspense";
import NewsContainer from "./components/News/NewsContainer";
import { GlobalStateType } from "./redux/reduxStore";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type PropsType = MapStateToPropsType & MapDispatchToPropsType
class App extends React.Component<PropsType> {
    catchAllUnhandledErrors = (reason: any, promise: any) => {
        let errorText = ''
        if (reason.reason.message === 'Request failed with status code 403') {
            errorText = 'Invalid "API-KEY" in api.js'
        } else (
            errorText = reason.reason.message
        )
        alert(errorText)
    }

    componentDidMount() {
        this.props.initializeApp();
        //@ts-ignore
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        //@ts-ignore
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) return <Preloader />
        return (
            <div className={classes.wrapper}>
                <HeaderContainer />
                <Navbar />
                <div className={classes.content}>
                    <Switch>
                        <Route exact path="/"><Redirect to="/profile" /></Route>
                        <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
                        <Route path="/dialogs/:userId?" render={withSuspense(DialogsContainer)} />
                        <Route path="/news" render={withSuspense(NewsContainer)} />
                        <Route path="/music" render={() => <Music />} />
                        <Route path="/setting" render={() => <Setting />} />
                        <Route path="/users" render={withSuspense(UsersContainer)} />
                        <Route path="/login" render={() => <Login />} />
                        <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>
            </div>
        );
    };
}
type MapStateToPropsType = { initialized: boolean }
const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}
type MapDispatchToPropsType = { initializeApp: () => void }
export default compose<ComponentType<{}>>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalStateType>(mapStateToProps, { initializeApp }),
    withRouter)
    (App);
