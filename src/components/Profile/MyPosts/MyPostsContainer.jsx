import { addPost, inputPostText } from "../../../redux/reduceProfile";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

// const MyPostsContainer = props => {
//   const state = props.state.profilePage;

//   const addNewPost = () => {
//     props.dispatch(addPost());
//   };
//   const inputPost = value => {
//     props.dispatch(inputPostText(value));
//   };

//   return (
//     <MyPosts
//       posts={state.posts}
//       addNewPost={addNewPost}
//       inputPost={inputPost}
//       inputText={state.inputPostText}
//     />
//   );
// };

const mapStateToProps = state => {
  return {
    inputText: state.profilePage.inputPostText,
    posts: state.profilePage.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewPost: () => {
      dispatch(addPost());
    },
    inputPost: value => {
      dispatch(inputPostText(value));
    }
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
