import React from "react";
import classes from "../../../styles/News.module.scss";

const News = ({ ...props }) => {
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

  const addPost = ev => {
    ev.preventDefault();
    props.addPostThunk(props.textPost);
  };

  const onPostChange = ev => {
    let body = ev.target.value;
    props.textPostAdd(body);
  };

  const previousPosts = () => {
    props.getMyPosts(props.lastSeenId);
  };

  const fileSelected = e => {
    if (e.target.files.length) {
      props.saveMediaFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <form>
        <input onChange={onPostChange} value={props.textPost} />
        <input onChange={fileSelected} type={"file"} />
        <button>Download</button>
        <button>Record</button>
        <button onClick={addPost}>Add</button>
      </form>

      {props.lastSeenId !== 0 &&
        props.posts.map(post => (
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

              <button>{post.id}</button>
            </div>
          </div>
        ))}
      <div>
        <button
          className={!props.prevPostsButton ? classes.displayNone : ""}
          onClick={previousPosts}
        >
          Previous posts
        </button>
      </div>
    </div>
  );
};

export default News;
