import React from "react";
import { connect } from "react-redux";
import {
  getUsersThunk,
  postFollowThunk,
  deleteFollowThunk
} from "../../../redux/reduceUsers";
import { compose } from "redux";
import { startDialogThunk } from "../../../redux/reduceDialogs";
import Pagination from "../../../common/Pagination/Pagination";
import Preloader from "../../../common/Preloader/Preloader";
import UserPage from "./UserPage";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunk(this.props.usersCount, this.props.pageNumber);
  }

  onNumberPage = pageNumber => {
    this.props.getUsersThunk(this.props.usersCount, pageNumber);
  };

  render() {
    return (
      <div>
        <Pagination
          totalCount={this.props.totalCount}
          usersCount={this.props.usersCount}
          numberPage={this.props.numberPage}
          onNumberPage={this.onNumberPage}
        />
        {this.props.isLoading ? (
          <Preloader />
        ) : (
          <UserPage
            users={this.props.users}
            postFollowThunk={this.props.postFollowThunk}
            deleteFollowThunk={this.props.deleteFollowThunk}
            startDialogThunk={this.props.startDialogThunk}
            isAuth={this.props.isAuth}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersPage.users,
    usersCount: state.usersPage.usersCount,
    totalCount: state.usersPage.totalCount,
    numberPage: state.usersPage.numberPage,
    isLoading: state.usersPage.isLoading,
    isAuth: state.auth.isAuth
  };
};

export default compose(
  connect(mapStateToProps, {
    postFollowThunk,
    deleteFollowThunk,
    getUsersThunk,
    startDialogThunk
  })
)(UsersContainer);
