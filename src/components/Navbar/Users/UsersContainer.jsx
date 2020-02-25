import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import {
  getUsersThunk,
  postFollowThunk,
  deleteFollowThunk
} from "../../../redux/reduceUsers";
// import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getUsers, getUsersCount, getTotalCount, getNumberPage, getIsLoading } from "../../../redux/selectorUsers";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunk(this.props.usersCount, this.props.pageNumber);
  }

  onNumberPage = pageNumber => {
    this.props.getUsersThunk(this.props.usersCount, pageNumber);
  };

  render() {
    return (
      <Users
        isLoading={this.props.isLoading}
        totalCount={this.props.totalCount}
        usersCount={this.props.usersCount}
        numberPage={this.props.numberPage}
        users={this.props.users}
        onNumberPage={this.onNumberPage}
        postFollowThunk={this.props.postFollowThunk}
        deleteFollowThunk={this.props.deleteFollowThunk}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    users: getUsers(state),
    usersCount: getUsersCount(state),
    totalCount: getTotalCount(state),
    numberPage: getNumberPage(state),
    isLoading: getIsLoading(state)
  };
};

export default compose(
  connect(mapStateToProps, {
    postFollowThunk,
    deleteFollowThunk,
    getUsersThunk
  })
  // withAuthRedirect
)(UsersContainer);
