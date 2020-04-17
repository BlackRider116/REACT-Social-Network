import React from "react";
import classes from "../../../styles/Profile.module.scss";
import { Card, Button } from "react-bootstrap";
import { DeleteFilled } from "@ant-design/icons";

const Posts = ({posts, ...props}) => {
  return (
    <Card className={classes.profilePost}>
      <div className={classes.profilePostItem}>
        <img alt="Post" src={props.avaPhoto} />
        <span>{posts.postText}</span>
      </div>
      <div className={classes.profilePostLikes}>
        <span>{`💗 ${posts.likes}  `}</span>
        <Button
          variant="success"
          onClick={() => props.likeDislikeMyPost(posts.id, true)}
        >
          <span>{"👍"}</span>
        </Button>
        <Button
          variant="danger"
          onClick={() => props.likeDislikeMyPost(posts.id, false)}
        >
          <span>{"👎"}</span>
        </Button>
        <Button
          variant="dark"
          style={{ float: "right" }}
          onClick={() => props.deleteMyPost(posts.id)}
        >
          <DeleteFilled style={{ color: "red" }} />
        </Button>
      </div>
    </Card>
  );
};

export default Posts;
