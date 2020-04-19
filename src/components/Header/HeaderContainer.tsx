import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout, setAvatarThunk } from "../../redux/reducers/reduceAuth";
import { GlobalStateType } from "../../redux/reduxStore";

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return (
      <Header
        isAuth={this.props.isAuth}
        login={this.props.login}
        logout={this.props.logout}
        avatar={this.props.avatar}
        setAvatarThunk={this.props.setAvatarThunk}
      />
    );
  }
}

type MapStateToPropsType = {
  isAuth: boolean
  login: string | null
  avatar: string | null
}

const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    avatar: state.auth.avatar
  };
};

type MapDispatchToPropsType = {
  logout: () => void
  setAvatarThunk: () => void
}
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalStateType >(mapStateToProps, { logout, setAvatarThunk })(HeaderContainer);
