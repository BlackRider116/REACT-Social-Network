import React from "react";
import News from "./News";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getMyPosts,
  likePost,
  dislikePost,
  deletePost,
  addPostThunk,
  textPostAdd,
  saveMediaFile,
} from "../../../redux/reduceNews";
import Preloader from "../../../common/Preloader/Preloader";

class NewsContainer extends React.Component {
  componentDidMount() {
    this.props.getMyPosts();
  }

  componentDidUpdate(prevState) {
    if (
      this.props.posts.length !== prevState.posts.length &&
      this.props.posts.length < 5
    ) {
      this.props.getMyPosts(0);
    }
  }

  render() {
    if (!this.props.posts) return <Preloader />;
    return <News {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.news.posts,
    lastSeenId: state.news.lastSeenId,
    prevPostsButton: state.news.prevPostsButton,
    textPost: state.news.textPost
  };
};

export default compose(
  connect(mapStateToProps, {
    getMyPosts,
    likePost,
    dislikePost,
    deletePost,
    addPostThunk,
    textPostAdd,
    saveMediaFile
  })
  // withAuthRedirect
)(NewsContainer);
