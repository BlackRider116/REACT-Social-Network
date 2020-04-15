import React from "react";
import { connect } from "react-redux";
import {
  getUsersThunk,
  followUnFollowThunk,
  pagesNumbersThunk
} from "../../../redux/reduceUsers";
import { compose } from "redux";
import { startDialogThunk } from "../../../redux/reduceDialogs";
import Pagination from "../../../common/Pagination/Pagination";
import Preloader from "../../../common/Preloader/Preloader";
import UserPage from "./UserPage";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunk();
  }

  onNumberPage = (pageNumber, portionPagesNumbers) => {
    // console.log(portionPagesNumbers)
    this.props.getUsersThunk(pageNumber, portionPagesNumbers);
  };

  onPagesNumbers = portionNumber => {
    this.props.pagesNumbersThunk(portionNumber)
  }

  render() {
    const {numberPage, pagesNumbers, portionPagesNumbers} = this.props
    const {onNumberPage, onPagesNumbers} = this
    const paginationProps = {numberPage, pagesNumbers, portionPagesNumbers, onNumberPage, onPagesNumbers}
    return (
      <div>
        <Pagination
          // totalCount={this.props.totalCount}
          // usersCount={this.props.usersCount}
    
          {...paginationProps}

        />
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
        <Pagination
          // totalCount={this.props.totalCount}
          // usersCount={this.props.usersCount}

          {...paginationProps}

        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersPage.users,
    // usersCount: state.usersPage.usersCount,
    // totalCount: state.usersPage.totalCount,
    numberPage: state.usersPage.numberPage,
    isLoading: state.usersPage.isLoading,
    pagesNumbers: state.usersPage.pagesNumbers,
    portionPagesNumbers: state.usersPage.portionPagesNumbers,
    isAuth: state.auth.isAuth
  };
};

export default compose(
  connect(mapStateToProps, {
    followUnFollowThunk,
    getUsersThunk,
    startDialogThunk,
    pagesNumbersThunk
  })
)(UsersContainer);
