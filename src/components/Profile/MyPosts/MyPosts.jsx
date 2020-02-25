import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";

const MyPosts = props => {
  const posts = props.posts.map(post => <Post posts={post} key={post.id} />);

  const onSubmit = postText => {
    props.addNewPost(postText);
  };

  return (
    <div>
      <MyPostFormRedux onSubmit={onSubmit} />
      <div className={classes.content}>{posts}</div>
    </div>
  );
};

const MyPostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.input}>
        <Field name="newPost" component="textarea" />
        <button>Add Post</button>
      </div>
    </form>
  );
};

const MyPostFormRedux = reduxForm({ form: "myNewPost" })(MyPostForm);

export default MyPosts;
