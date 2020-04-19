import React from "react";
import styles from "../../styles/News.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import { Card, Button } from "react-bootstrap";
import { NewsPostType } from "../../redux/reducers/reduceNews";

type PropsType = {
  posts: Array<NewsPostType>
  lastSeenId: number
  prevPostsButton: boolean
  getMyPosts: (lastSeenId: number) => void
  likePost: (postId: number) => void
  dislikePost: (postId: number) => void
  deletePost: (postId: number) => void
}

const News: React.FC<PropsType> = (props) => {
  const typePost = (post: NewsPostType) => {
    if (post.type === "image") {
      return <img style={{ maxHeight: '60vh', width: "100%" }} src={post.file} alt="" />;
    } else if (post.type === "audio") {
      return <audio style={{ width: "100%" }} src={post.file} controls />;
    } else if (post.type === "video") {
      return <video style={{ maxHeight: '60vh', width: "100%" }} src={post.file} controls />;
    } else {
      return null;
    }
  };

  const previousPosts = () => {
    props.getMyPosts(props.lastSeenId);
  };

  if (!props.posts.length) return <Preloader />;
  return (
    <>
      {props.lastSeenId !== 0 &&
        props.posts.map(post => (
          <Card key={post.id} style={{ margin: "5px", borderColor: "black" }}>
            {typePost(post)}
            <Card.Body style={{ backgroundColor: "rgb(215, 215, 215)", }} >
              <Card.Text style={{ fontSize: "20px" }} >{post.content}</Card.Text>
              <span style={{ marginRight: "10px", fontSize: "20px" }} >{`💗 ${post.likes}`}</span>
              <Button variant="outline-success" onClick={() => { props.likePost(post.id) }}>{`👍`}</Button>
              <Button variant="outline-warning" onClick={() => { props.dislikePost(post.id) }}>{`👎`}</Button>
              <Button variant="outline-danger" onClick={() => { props.deletePost(post.id) }}>Удалить</Button>
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
