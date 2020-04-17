import React from "react";
import classes from "../../../styles/Profile.module.scss";
import MyPosts from "./MyPosts";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { reset } from "redux-form";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  actionsProfile,
  likeDislikeMyPost
} from "../../../redux/reducers/reduceProfile";
import { compose } from "redux";

const MyPostsContainer = props => {
  const myPosts = props.posts.map(post => (
    <MyPosts
      avaPhoto={props.avaPhoto}
      posts={post}
      key={post.id}
      likeDislikeMyPost={props.likeDislikeMyPost}
      deleteMyPost={props.deleteMyPost}
    />
  ));
  const myProfile = props.match.params.userId;

  const onSubmit = (postText, dispatch) => {
    props.addNewPost(postText.newPost, props.avaPhoto);
    dispatch(reset("myNewPost"));
  };
 
  localStorage.setItem('MyPosts', JSON.stringify(props.posts))
  return (
    <>
      {!myProfile && (
        <div>
          <MyPostFormRedux onSubmit={onSubmit} />
          <div style={{ marginBottom: "10px" }}>{myPosts}</div>
          <div className={classes.deleteLocalStorage}>
            <Button
              variant="danger"
              onClick={() => localStorage.removeItem("MyPosts")}
            >
              Очиcтить localStorage
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const MyPostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.myPosts}>
        <Field name="newPost" component="textarea" />
        <Button type="submit">Добавить</Button>
      </div>
    </form>
  );
};

const MyPostFormRedux = reduxForm({ form: "myNewPost" })(MyPostForm);

const mapStateToProps = state => {
  return {
    posts: state.profilePage.posts,
    avaPhoto: state.profilePage.profile.photos.small
  };
};

export default compose(
  connect(mapStateToProps, {
    addNewPost: actionsProfile.addNewPost,
    likeDislikeMyPost,
    deleteMyPost: actionsProfile.deleteMyPost
  }),
  withRouter
)(MyPostsContainer);
