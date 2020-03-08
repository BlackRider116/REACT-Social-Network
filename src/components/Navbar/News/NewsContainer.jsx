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
  textPostAdd
} from "../../../redux/reduceNews";
import Preloader from "../../../common/Preloader/Preloader";

class NewsContainer extends React.Component {
  
  componentDidMount() {
    this.props.getMyPosts();
  }
  // componentDidUpdate() {
    // console.log(this.props.lastSeenId)
  //   if (this.props.lastSeenId!==0 && this.props.posts.length < 5) {
  //     this.props.getMyPosts();
  //   }
  // }

  render() {
    if (this.props.lastSeenId!==0 && !this.props.posts) return <Preloader />;
    return <News {...this.props}/>;
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
    getMyPosts,
    likePost,
    dislikePost,
    deletePost,
    addPostThunk,
    textPostAdd
  })
  // withAuthRedirect
)(NewsContainer);
