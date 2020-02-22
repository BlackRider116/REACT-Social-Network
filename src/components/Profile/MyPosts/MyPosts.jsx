import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = props => {
  const posts = props.posts.map(post => <Post posts={post} key={post.id}/>);

  const onAddNewPost = () => {
    props.addNewPost();
  };
  const onInputChange = event => {
    const post = event.target.value;
    props.inputPost(post);
  };

  return (
    <div className={classes.content}>
      <div className={classes.input}>
        <textarea onChange={onInputChange} value={props.inputText}></textarea>
        <button onClick={onAddNewPost}>Add Post</button>
      </div>
      {posts}
    </div>
  );
};

export default MyPosts;
