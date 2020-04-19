import React from "react";
import styles from "../../styles/News.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import { Card, Button } from "react-bootstrap";

const News = ({ ...props }) => {
  const typePost = post => {
    if (post.type === "") {
      return null;
    } else if (post.type === "image") {
      return <img style={{maxHeight: '60vh', width: "100%"}} variant="top" src={post.file} alt="" />;
    } else if (post.type === "audio") {
      return <audio style={{width: "100%"}}  src={post.file} controls/>;
    } else if (post.type === "video") {
      return <video style={{width: "100%", maxHeight: '60vh'}}  src={post.file} controls />;
    }
  };

  const previousPosts = () => {
    props.getMyPosts(props.lastSeenId);
  };

  if (!props.posts.length) return <Preloader /> ;
  return (
    <>
      {props.lastSeenId !== 0 &&
        props.posts.map(post => (
            <Card  key={post.id} style={{ margin: "5px", borderColor: "black" }}>
              {typePost(post)}
              <Card.Body style={{ backgroundColor: "rgb(215, 215, 215)", }} >
                <Card.Text style={{fontSize: "20px"}} >{post.content}</Card.Text>
                <span style={{marginRight: "10px", fontSize: "20px"}} >{`💗 ${post.likes}`}</span>
                <Button variant="outline-success" onClick={() => {props.likePost(post.id) }}>{`👍`}</Button>
                <Button variant="outline-warning" onClick={() => {props.dislikePost(post.id)}}>{`👎`}</Button>
                <Button variant="outline-danger" onClick={() => {props.deletePost(post.id)}}>Удалить</Button>
              </Card.Body>
            </Card>
        ))}

        <Button variant="secondary"
          className={!props.prevPostsButton ? styles.displayNone : styles.prevBtn}
          onClick={previousPosts}
        >
          Показать еще
        </Button>

    </>
  );
};

export default News;
