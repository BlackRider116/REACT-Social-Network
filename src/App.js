import React from "react";
import classes from "./App.module.scss";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import Setting from "./components/Setting/Setting";
import Music from "./components/Navbar/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/reducers/reduceApp";
import Preloader from "./common/Preloader/Preloader";

import withSuspense from "../src/hoc/withSuspense";
import NewsContainer from "./components/Navbar/News/NewsContainer";
const DialogsContainer = React.lazy(() => import('./components/Navbar/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Navbar/Users/UsersContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))


class App extends React.Component {
    catchAllUnhandledErrors = (reason, promise) => {
        let errorText = ''
        if(reason.reason.message==='Request failed with status code 403') {
            errorText='Invalid "API-KEY" in api.js'
        } else (
            errorText=reason.reason.message
        )
        alert(errorText) 
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
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

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default compose(
    connect(mapStateToProps, { initializeApp }),
    withRouter)
    (App);
