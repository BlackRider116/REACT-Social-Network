import React from "react";
import classes from "../../../../styles/Profile.module.scss";

const Post = props => {
  return (
    <div className={classes.profilePostItem}>
      <img alt='Post' src={props.posts.src} />
      {props.posts.postText}
      <div className={classes.profilePostLikes}>
        {props.posts.likes}
        <button>Likes</button>
      </div>
    </div>
  );
};

export default Post;
