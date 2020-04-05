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
  Dropdown,
  Card
} from "react-bootstrap";
import loadMedia from "../../../assets/image/loadMedia.gif";
import classes from "../../../styles/News.module.scss";
import Timer from "react.timer";

class NewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadBtn: false,
      uploadBtnLoading: false,
      recordVideo: false,
      recordBtn: false,
      recordBtnDisable: false,
      addBtn: false
    };
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
    this.setState({
      uploadBtn: false,
      uploadBtnLoading: false,
      recordBtn: false,
      addBtn: false
    });
  };

  onPostChange = ev => {
    this.props.textPostAdd(ev.target.value);
  };

  fileUpload = React.createRef();
  fileSelected = ev => {
    this.setState({ recordBtn: true, uploadBtnLoading: true, addBtn: true });
    const [first] = Array.from(ev.currentTarget.files);

    saveMediaFile(first).finally(() => {
      this.setState({ addBtn: false, uploadBtnLoading: false });
    });
  };

  recordMediaUser = typeMedia => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Нет подключенных медиа устройств");
      return;
    }
    this.setState({
      uploadBtn: true,
      addBtn: true,
      recordBtnDisable: true,
      recordBtn: true
    });
    if (typeMedia === "audio") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          recordStream(stream, typeMedia);
        })
        .catch(err => {
          console.log("Нет доступа к микрофону");
        });
    }
    if (typeMedia === "video") {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(stream => {
          recordStream(stream, typeMedia);
          this.video.srcObject = stream;
          this.video.play();
          this.setState({ recordVideo: true });
        })
        .catch(err => {
          console.log("Нет доступа к камере и/или к микрофону");
        });
    }

    const recordStream = (stream, type) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = ev => {
        stream.getTracks().forEach(o => o.stop());
        this.setState({ recordBtnDisable: false, recordVideo: false });
        const blob = new Blob([ev.data]);
        saveMediaFile(blob, type).finally(() => {
          this.setState({ addBtn: false, recordBtn: false });
        });
      };

      setTimeout(() => {
        mediaRecorder.stop();
      }, 10000);
    };
  };

  // stopRecorder = () => {
  //   mediaRecorder.stop();
  // }

  render() {
    return (
      <div>
        <InputGroup
          style={{
            position: "fixed",
            width: "60%",
            marginTop: "5px",
            zIndex: "100"
          }}
        >
          <FormControl
            value={this.props.textPost}
            placeholder="Введите текст вашего поста"
            onChange={this.onPostChange}
          />

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
            {!this.state.uploadBtnLoading ? (
              " Загрузить"
            ) : (
              <div>
                <img src={loadMedia} alt="Loading" />
                <span> Ждите...</span>{" "}
              </div>
            )}
          </Button>

          {!this.state.recordBtnDisable ? (
            <DropdownButton
              title="Запись"
              variant="secondary"
              style={{ paddingLeft: "2px" }}
              disabled={this.state.recordBtn}
            >
              <Dropdown.Item onClick={() => this.recordMediaUser("video")}>
                Видео
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.recordMediaUser("audio")}>
                Аудио
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            <Button variant="warning" onClick={() => this.mediaRecorder.stop()}>
              <Timer /> Стоп
            </Button>
          )}

          <Button
            disabled={this.state.addBtn}
            style={{ marginLeft: "2px" }}
            variant="success"
            onClick={this.addPost}
          >
            Добавить
          </Button>
        </InputGroup>

        <div
          style={{
            position: "fixed",
            width: "60%",
            marginTop: "50px",
            zIndex: "100"
          }}
        >
          <Card className={!this.state.recordVideo && classes.displayNone}>
            <video
              style={{ width: "100%", maxHeight: "640px" }}
              muted={true}
              ref={a => {
                this.video = a;
              }}
            />
          </Card>
        </div>

        <div style={{ paddingTop: "50px" }}>
          <News {...this.props} />
        </div>
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
