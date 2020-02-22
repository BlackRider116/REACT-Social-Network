import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import {
  getUsersThunk,
  postFollowThunk,
  deleteFollowThunk
} from "../../../redux/reduceUsers";
import Preloader from "../../../common/Preloader/Preloader";


class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunk(this.props.usersCount, this.props.pageNumber)
  }

  onNumberPage = pageNumber => {
    this.props.getUsersThunk(this.props.usersCount, pageNumber)
  };

  render() {
    return (
      <>
        {this.props.isLoading ? <Preloader /> : undefined}
        <Users
          totalCount={this.props.totalCount}
          usersCount={this.props.usersCount}
          numberPage={this.props.numberPage}
          users={this.props.users}
          onNumberPage={this.onNumberPage}
          postFollowThunk={this.props.postFollowThunk}
          deleteFollowThunk={this.props.deleteFollowThunk}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersPage.users,
    usersCount: state.usersPage.usersCount,
    totalCount: state.usersPage.totalCount,
    numberPage: state.usersPage.numberPage,
    isLoading: state.usersPage.isLoading
  };
};

export default connect(mapStateToProps, {
  postFollowThunk,
  deleteFollowThunk,
  getUsersThunk
})(UsersContainer);
