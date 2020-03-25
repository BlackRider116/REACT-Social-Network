import React from "react";
import classes from "../../../styles/Profile.module.scss";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import {reset} from 'redux-form';

const MyPosts = props => {
  const posts = props.posts.map(post => <Post posts={post} key={post.id} />);
  const myProfile = props.match.params.userId;

  const onSubmit = (postText, dispatch) => {
    props.addNewPost(postText);
    dispatch(reset("myNewPost"))
  };

  return (
    <>
      {!myProfile && (
        <div>
          <MyPostFormRedux onSubmit={onSubmit} />
          <div className={classes.myPostsContent}>{posts}</div>
        </div>
      )}
    </>
  );
};

const MyPostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.myPostsInput}>
        <Field name="newPost" component="textarea" />
        <button>Add Post</button>
      </div>
    </form>
  );
};

const MyPostFormRedux = reduxForm({ form: "myNewPost" })(MyPostForm);

export default withRouter(MyPosts);
