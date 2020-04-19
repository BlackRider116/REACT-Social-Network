import React, { ComponentType } from "react";
import { connect } from "react-redux";
import {
  getUsersThunk,
  followUnFollowThunk,
  pagesNumbersThunk,
  UsersType
} from "../../../redux/reducers/reduceUsers";
import { compose } from "redux";
import { startDialogThunk } from "../../../redux/reducers/reduceDialogs";
import Pagination from "../../../common/Pagination/Pagination";
import Preloader from "../../../common/Preloader/Preloader";
import UserPage from "./UserPage";
import { GlobalStateType } from "../../../redux/reduxStore";

type PropsType = MapStateToPropsType & MapDispatchToPropsType
class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsersThunk(1, 1);
  }

  onNumberPage = (pageNumber: number, portionPagesNumbers: number) => {
    this.props.getUsersThunk(pageNumber, portionPagesNumbers);
  };

  onPagesNumbers = (portionNumber: number) => {
    this.props.pagesNumbersThunk(portionNumber)
  }

  render() {
    const { numberPage, pagesNumbers, portionPagesNumbers } = this.props
    const { onNumberPage, onPagesNumbers } = this
    const paginationProps = { numberPage, pagesNumbers, portionPagesNumbers, onNumberPage, onPagesNumbers }
    return (
      <div>
        <Pagination  {...paginationProps} />
        {this.props.isLoading ? (
          <Preloader />
        ) : (
            <UserPage
              users={this.props.users}
              followUnFollowThunk={this.props.followUnFollowThunk}
              startDialogThunk={this.props.startDialogThunk}
              isAuth={this.props.isAuth}
            />
          )}
        <Pagination  {...paginationProps} />
      </div>
    );
  }
}

type MapStateToPropsType = {
  users: Array<UsersType>
  numberPage: number
  isLoading: boolean
  pagesNumbers: Array<number>
  portionPagesNumbers: number
  isAuth: boolean
}
const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users,
    numberPage: state.usersPage.numberPage,
    isLoading: state.usersPage.isLoading,
    pagesNumbers: state.usersPage.pagesNumbers,
    portionPagesNumbers: state.usersPage.portionPagesNumbers,
    isAuth: state.auth.isAuth
  };
};

type MapDispatchToPropsType = {
  followUnFollowThunk: (userId: number, boolean: boolean) => void
  getUsersThunk: (pageNumber: number, portionPagesNumbers: number) => void
  startDialogThunk: (userId: number) => void
  pagesNumbersThunk: (portionNumber: number) => void
}
export default compose<ComponentType<{}>>(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalStateType>(mapStateToProps, {
    followUnFollowThunk,
    getUsersThunk,
    startDialogThunk,
    pagesNumbersThunk
  })
)(UsersContainer);
