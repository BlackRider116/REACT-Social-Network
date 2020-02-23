import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Profile from "./Profile";
import { getProfileThunk } from "../../redux/reduceProfile";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) userId = 2;
    this.props.getProfileThunk(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profilePage.profile
  };
};

export default compose(
  connect(mapStateToProps, { getProfileThunk }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
