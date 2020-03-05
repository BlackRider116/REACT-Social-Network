import React from "react";
import classes from "./News.module.css";

const News = ({ posts, ...props }) => {
  // console.log(props.textPost)
  const typePost = post => {
    if (post.type === "") {
      return null;
    } else if (post.type === "image") {
      return <img className={classes.video} src={post.file} alt=""></img>;
    } else if (post.type === "audio") {
      return <audio src={post.file} controls></audio>;
    } else if (post.type === "video") {
      return <video className={classes.video} src={post.file} controls></video>;
    }
  };

  // const submit = (values) => console.log('values');
  const addPost = (ev) => {
    ev.preventDefault()
    props.addPostThunk(props.textPost)
  }

  const onPostChange = ev => {
    let body = ev.target.value;
    props.textPostAdd(body)
  };

  return (
    <div>
      <form>
        <input onChange={onPostChange} value={props.textPost} />
        <button>Download</button>
        <button>Record</button>
        <button onClick={addPost}>Add</button>
      </form>

      {posts.map(post => (
        <div key={post.id}>
          {typePost(post)}
          <div>
            <p>{post.content}</p>
            <button>{`💗 ${post.likes}`}</button>
            <button
              onClick={() => {
                props.likePost(post.id);
              }}
            >{`👍`}</button>
            <button
              onClick={() => {
                props.dislikePost(post.id);
              }}
            >{`👎`}</button>
            <button
              onClick={() => {
                props.deletePost(post.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
