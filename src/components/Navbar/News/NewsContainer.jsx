import React from "react";
import News from "./News";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getMyPosts,
  likePost,
  dislikePost,
  deletePost,
  addPostThunk,
  textPostAdd,
  saveMediaFile
} from "../../../redux/reduceNews";
import { InputGroup, FormControl, Button } from "react-bootstrap";

class NewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploadBtn: false, recordBtn: false, addBtn: false };
  }

  componentDidMount() {
    this.props.getMyPosts();
  }

  componentDidUpdate(prevState) {
    if (
      this.props.posts.length !== prevState.posts.length &&
      this.props.posts.length < 5
    ) {
      this.props.getMyPosts(0);
    }
  }

  addPost = () => {
    this.props.addPostThunk(this.props.textPost);
    this.setState({ uploadBtn: false, recordBtn: false, addBtn: false });
  };

  onPostChange = ev => {
    this.props.textPostAdd(ev.target.value);
  };

  fileUpload = React.createRef();
  fileSelected = ev => {
    this.setState({ recordBtn: true, addBtn: true });
    const [first] = Array.from(ev.currentTarget.files);
    const formData = new FormData();
    formData.append("media", first);
    saveMediaFile(formData).finally(() => {
      this.setState({ addBtn: false });
    });
  };

 

  render() {
    return (
      <div>
        <InputGroup>
          <FormControl
            value={this.props.textPost}
            placeholder="Введите текст вашего поста"
            onChange={this.onPostChange}
          />
          <InputGroup.Append>
            <input
              ref={this.fileUpload}
              type="file"
              onChange={this.fileSelected}
              style={{ display: "none" }}
            />

            <Button
              onClick={() => this.fileUpload.current.click()}
              disabled={this.state.uploadBtn}
              variant="secondary"
              style={{ marginLeft: "2px" }}
            >
              Загрузить
            </Button>
            <Button
              disabled={this.state.recordBtn}
              variant="secondary"
              style={{ marginLeft: "2px" }}
            >
              Запись
            </Button>
            <Button
              disabled={this.state.addBtn}
              style={{ marginLeft: "2px" }}
              variant="success"
              onClick={this.addPost}
            >
              Добавить
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <News {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.news.posts,
    lastSeenId: state.news.lastSeenId,
    prevPostsButton: state.news.prevPostsButton,
    textPost: state.news.textPost,
    addPostFormData: state.news.addPostFormData
  };
};

export default compose(
  connect(mapStateToProps, {
    getMyPosts,
    likePost,
    dislikePost,
    deletePost,
    addPostThunk,
    textPostAdd
  })
)(NewsContainer);
