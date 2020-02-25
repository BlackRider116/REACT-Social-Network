import React from "react";
import classes from "./Post.module.css";

const Post = props => {
  return (
    <div className={classes.item}>
      <img alt='Post' src={props.posts.src} />
      {props.posts.postText}
      <div className={classes.likes}>
        {props.posts.likes}
        <button>Likes</button>
      </div>
    </div>
  );
};

export default Post;
