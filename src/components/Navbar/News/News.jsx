import React from "react";
import classes from "../../../styles/News.module.scss";
import Preloader from "../../../common/Preloader/Preloader";
import { Card, Button } from "react-bootstrap";

const News = ({ ...props }) => {
  const typePost = post => {
    if (post.type === "") {
      return null;
    } else if (post.type === "image") {
      return <Card.Img variant="top" src={post.file} alt="" />;
    } else if (post.type === "audio") {
      return <audio style={{width: "100%"}}  src={post.file} controls/>;
    } else if (post.type === "video") {
      return <video style={{width: "100%"}}  src={post.file} controls />;
    }
  };

  const previousPosts = () => {
    props.getMyPosts(props.lastSeenId);
  };

  if (!props.posts.length) return <Preloader />;
  return (
    <div>
      {props.lastSeenId !== 0 &&
        props.posts.map(post => (
          <div key={post.id}>
            <Card style={{ margin: "5px", borderColor: "black" }}>
              {typePost(post)}
              <Card.Body style={{ backgroundColor: "rgb(215, 215, 215)" }} >
                <Card.Text style={{fontSize: "20px"}} >{post.content}</Card.Text>
                <span style={{marginRight: "10px", fontSize: "20px"}} >{`💗 ${post.likes}`}</span>
                <Button variant="outline-success" onClick={() => {props.likePost(post.id) }}>{`👍`}</Button>
                <Button variant="outline-warning" onClick={() => {props.dislikePost(post.id)}}>{`👎`}</Button>
                <Button variant="outline-danger" onClick={() => {props.deletePost(post.id)}}>Удалить</Button>
              </Card.Body>
            </Card>

          </div>
        ))}
      <div>
        <Button variant="secondary" block
          className={!props.prevPostsButton ? classes.displayNone : ""}
          onClick={previousPosts}
        >
          Previous posts
        </Button>
      </div>
    </div>
  );
};

export default News;
