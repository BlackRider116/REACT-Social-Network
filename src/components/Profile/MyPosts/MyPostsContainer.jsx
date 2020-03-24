import { addNewPost } from "../../../redux/reduceProfile";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect(mapStateToProps, { addNewPost })(MyPosts);

export default MyPostsContainer;
