import React, { ComponentType, Dispatch } from "react";
import classes from "../../../styles/Profile.module.scss";
import { MyPosts } from "./MyPosts";
import { Field, reduxForm, reset, InjectedFormProps } from "redux-form";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  actionsProfile,
  likeDislikeMyPost,
  PostType
} from "../../../redux/reducers/reduceProfile";
import { compose } from "redux";
import { GlobalStateType } from "../../../redux/reduxStore";


type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<{ userId: string }>

const MyPostsContainer: React.FC<PropsType> = props => {
  const myPosts = props.posts.map(post => (
    <MyPosts
      avaPhoto={props.avaPhoto}
      posts={post}
      key={post.id}
      likeDislikeMyPost={props.likeDislikeMyPost}
      deleteMyPost={props.deleteMyPost}
    />
  ));

  const userId = props.match.params.userId

  const onSubmit = (postText: BodyValuesType, dispatch: Dispatch<{}>) => {
    props.addNewPost(postText.newPost, props.avaPhoto);
    dispatch(reset("myNewPost"));
  };

  localStorage.setItem("MyPosts", JSON.stringify(props.posts));

  return (
    <>
      {!userId && (
        <div>
          <MyPostFormRedux onSubmit={onSubmit} />
          <div style={{ marginBottom: "10px" }}>{myPosts}</div>
          <div className={classes.deleteLocalStorage}>
            {props.posts.length !== 0 &&
              <Button
                variant="danger"
                onClick={() => {
                  localStorage.removeItem("MyPosts");
                  props.deleteAllMyPosts();
                }}
              >
                Очиcтить localStorage и удалить посты
            </Button>}
          </div>
        </div>
      )}
    </>
  );
};


type BodyValuesType = { newPost: string }

const MyPostForm: React.FC<InjectedFormProps<BodyValuesType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.myPosts}>
        <Field name="newPost" component="textarea" />
        <Button type="submit">Добавить</Button>
      </div>
    </form>
  );
};

const MyPostFormRedux = reduxForm<BodyValuesType>({ form: "myNewPost" })(MyPostForm);

type MapStateToPropsType = {
  posts: Array<PostType>
  avaPhoto: string | null
}

const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
    avaPhoto: state.profilePage.profile !== null ? state.profilePage.profile.photos.small : null
  };
};

type MapDispatchToPropsType = {
  addNewPost: (postText: string, photo: string | null) => void
  likeDislikeMyPost: (postId: number, boolean: boolean) => void
  deleteMyPost: (postId: number) => void
  deleteAllMyPosts: () => void
}
export default compose<ComponentType<{}>>(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalStateType>(mapStateToProps, {
    addNewPost: actionsProfile.addNewPost,
    likeDislikeMyPost,
    deleteMyPost: actionsProfile.deleteMyPost,
    deleteAllMyPosts: actionsProfile.deleteAllMyPosts
  }),
  withRouter
)(MyPostsContainer);
