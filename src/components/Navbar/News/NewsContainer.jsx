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
import {
  InputGroup,
  FormControl,
  Button,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import loadMedia from "../../../assets/image/loadMedia.gif";

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
    this.setState({ recordBtn: true, addBtn: true, uploadBtn: true });
    const [first] = Array.from(ev.currentTarget.files);

    saveMediaFile(first).finally(() => {
      this.setState({ addBtn: false, uploadBtn: false });
    });
  };

  recordMediaUser = typeMedia => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Нет подключенных медиа устройств");
      return;
    }
    if (typeMedia === "audio") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          recordStream(stream, 'audio');
        })
        .catch(err => {
          console.log("Нет доступного микрофона");
        });
    }
    if (typeMedia === "video") {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(stream => {
          recordStream(stream, 'video');
        })
        .catch(err => {
          console.log("Нет доступной камеры или микрофона");
        });
    }

    function recordStream(stream, type) {
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = ev => {
        const blob = new Blob([ev.data]);
        saveMediaFile(blob, type);
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();

      }, 5000);

    }
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
              {!this.state.uploadBtn ? (
                " Загрузить"
              ) : (
                <div>
                  <img src={loadMedia} alt="Loading" />
                  <span> Ждите...</span>{" "}
                </div>
              )}
            </Button>

            <DropdownButton
              title="Запись"
              variant="secondary"
              style={{ margin: "2px" }}
              disabled={this.state.recordBtn}
            >
              <Dropdown.Item onClick={() => this.recordMediaUser("video")}>
                Видео
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.recordMediaUser("audio")}>
                Аудио
              </Dropdown.Item>
            </DropdownButton>

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
