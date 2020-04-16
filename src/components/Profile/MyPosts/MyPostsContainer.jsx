import { addNewPost } from "../../../redux/reducers/reduceProfile";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    posts: state.profilePage.posts,
    avaPhoto: state.profilePage.profile.photos.small
  };
};

const MyPostsContainer = connect(mapStateToProps, { addNewPost })(MyPosts);

export default MyPostsContainer;
