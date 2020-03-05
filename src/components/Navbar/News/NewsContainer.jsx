import React from "react";
import News from "./News";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  startGetPosts,
  likePost,
  dislikePost,
  deletePost,
  addPostThunk,
  textPostAdd
} from "../../../redux/reduceNews";
import Preloader from "../../../common/Preloader/Preloader";

class NewsContainer extends React.Component {
  componentDidMount() {
    this.props.startGetPosts();
  }
  // componentDidUpdate() {
  //   this.props.startGetPosts();
  // }


  render() {
    if (!this.props.posts) return <Preloader />;
    return <News {...this.props}  />;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.news.posts,
    firstSeenId: state.news.firstSeenId,
    lastSeenId: state.news.lastSeenId,
    textPost: state.news.textPost
  };
};

export default compose(
  connect(mapStateToProps, {
    startGetPosts,
    likePost,
    dislikePost,
    deletePost,
    addPostThunk,
    textPostAdd
  })
  // withAuthRedirect
)(NewsContainer);
