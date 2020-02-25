import React from "react";
import classes from "./App.module.css";
import { Route, withRouter } from "react-router-dom";
import News from "./components/Navbar/News/News";
import Setting from "./components/Setting/Setting";
import Music from "./components/Navbar/Music/Music";
import Sidebar from "./components/Sidebar/Sidevar";
import DialogsContainer from "./components/Navbar/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import FriendsContainer from "./components/Navbar/Friends/FriendsContainer";
import UsersContainer from "./components/Navbar/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/reduceApp";
import Preloader from "./common/Preloader/Preloader";

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
                    <Route path="/dialogs" render={() => <DialogsContainer />} />
                    <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                    <Route path="/news" render={() => <News />} />
                    <Route path="/music" render={() => <Music />} />
                    <Route path="/setting" render={() => <Setting />} />
                    <Route path="/users" render={() => <UsersContainer />} />
                    <Route path="/friends" render={() => <FriendsContainer />} />
                    <Route path="/login" render={() => <Login />} />
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
