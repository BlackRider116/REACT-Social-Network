import React from "react";
import classes from "./App.module.css";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import News from "./components/Navbar/News/News";
import Setting from "./components/Setting/Setting";
import Music from "./components/Navbar/Music/Music";
import Sidebar from "./components/Sidebar/Sidevar";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/reduceApp";
import Preloader from "./common/Preloader/Preloader";

import withSuspense from "../src/hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/Navbar/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Navbar/Users/UsersContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();

    }

    render() {
        if (!this.props.initialized) return <Preloader />
        return (
            <div className={classes.wrapper}>
                <HeaderContainer />
                <NavbarContainer />
                <div className={classes.content}>
                    <Switch>
                        <Route exact path="/"><Redirect to="/profile" /></Route> 
                        <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
                        <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
                        <Route path="/news" render={() => <News />} />
                        <Route path="/music" render={() => <Music />} />
                        <Route path="/setting" render={() => <Setting />} />
                        <Route path="/users" render={withSuspense(UsersContainer)} />
                        <Route path="/login" render={() => <Login />} />
                        <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>
                <Sidebar />
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
