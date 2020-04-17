import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/reducers/reduceAuth";
import { getProfileThunk } from "../../redux/reducers/reduceProfile";

class HeaderContainer extends React.Component {
  componentDidMount(){
    if (this.props.myId !== null) this.props.getProfileThunk(this.props.myId)
  }
  render() {
    return (
      <Header
        isAuth={this.props.isAuth}
        login={this.props.login}
        logout={this.props.logout}
        profile={this.props.profile}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    myId: state.auth.userId,
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profile: state.profilePage.profile
  };
};

export default connect(mapStateToProps, { logout, getProfileThunk })(HeaderContainer);
