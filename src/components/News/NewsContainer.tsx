import React from "react";
import News from "./News";
import { connect } from "react-redux";
import {
  getMyPosts,
  likePost,
  dislikePost,
  deletePost,
  addPostThunk,
  actionsNews,
  saveMediaFile,
  NewsPostType
} from "../../redux/reducers/reduceNews";
import {
  InputGroup,
  FormControl,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  ButtonGroup
} from "react-bootstrap";
import loadMedia from "../../assets/image/loadMedia.gif";
import styles from "../../styles/News.module.scss";
//@ts-ignore
import Timer from "react.timer";
import { GlobalStateType } from "../../redux/reduxStore";
import { RouteComponentProps } from "react-router";


type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps

type StateType = {
  uploadBtn: boolean
  uploadBtnLoading: boolean
  recordVideo: boolean
  recordBtn: boolean
  recordBtnDisable: boolean
  waitRecordBtn: boolean
  error: boolean
  errorText: string
  addBtn: boolean
}
class NewsContainer extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      uploadBtn: false,
      uploadBtnLoading: false,
      recordVideo: false,
      recordBtn: false,
      recordBtnDisable: false,
      waitRecordBtn: false,
      error: false,
      errorText: "",
      addBtn: false
    };
  }

  componentDidMount() {
    this.props.getMyPosts(0);
  }

  componentDidUpdate(prevState: PropsType) {
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

  onPostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.textPostAdd(event.currentTarget.value);
  };

  fileUpload: React.RefObject<HTMLInputElement> = React.createRef();
  fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ recordBtn: true, uploadBtnLoading: true, addBtn: true });
    if (event.currentTarget.files !== null) {
      const [first] = Array.from(event.currentTarget.files);
      saveMediaFile(first, '').finally(() => {
        this.setState({ addBtn: false, uploadBtnLoading: false });
      });
    }
  };

  video = (document.getElementById('media-user-stream') as any)
  recordMediaUser = (typeMedia: string) => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      this.setState({
        error: true,
        errorText: "Нет подключенных медиа устройств"
      });
      return;
    }
    if (typeMedia === "audio") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          this.recordStream(stream, typeMedia, false);
        })
        .catch(err => {
          this.setState({ error: true, errorText: "Нет доступа к микрофону" });
        });
    }
    if (typeMedia === "video") {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(stream => {
          this.recordStream(stream, typeMedia, false);
          this.video.srcObject = stream
          this.video.play();
          this.setState({ recordVideo: true });
        })
        .catch(err => {
          this.setState({
            error: true,
            errorText: "Нет доступа к камере и/или к микрофону"
          });
        });
    }
  };

  mediaRecorder: MediaRecorder | undefined = undefined
  recordStream = (stream: MediaStream, type: string, isStop: boolean) => {
    this.setState({
      uploadBtn: true,
      addBtn: true,
      recordBtnDisable: true,
      recordBtn: true,
      waitRecordBtn: true
    });

    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.start();
    this.mediaRecorder.ondataavailable = (ev: BlobEvent) => {
      stream.getTracks().forEach((o) => o.stop());
      this.setState({ recordBtnDisable: false, recordVideo: false });
      const blob = new Blob([ev.data]);
      saveMediaFile(blob, type).finally(() => {
        this.setState({ addBtn: false, recordBtn: false, waitRecordBtn: false });
      });
    };
    if (isStop === true) this.mediaRecorder.stop();
    setTimeout(() => {
      if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
        this.mediaRecorder.stop();
      }
    }, 60000);
  };

  render() {
    return (
      <div className={styles.global}>
        <InputGroup className={styles.inputGroup}   >
          <FormControl
            style={{ border: '1px solid black', height: '40px' }}
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
            onClick={() => { if (this.fileUpload.current) this.fileUpload.current.click() }}
            disabled={this.state.uploadBtn}
            variant="secondary"
            style={{ marginLeft: "2px", border: '1px solid black' }}
          >
            {!this.state.uploadBtnLoading ? (
              " Загрузить"
            ) : (
                <div>
                  <img style={{ height: '20px' }} src={loadMedia} alt="Loading" />
                  <span> Ждите...</span>
                </div>
              )}
          </Button>

          {!this.state.recordBtnDisable ? (
            !this.state.waitRecordBtn ?
              <DropdownButton
                key={'Запись'}
                as={ButtonGroup}
                title="Запись"
                id='dropdown-variants-secondary'
                variant='secondary'
                style={{ marginLeft: "2px", border: '1px solid black', borderRadius: '5px' }}
                disabled={this.state.recordBtn}
              >
                <Dropdown.Item onClick={() => this.recordMediaUser("video")}>
                  Видео
              </Dropdown.Item>
                <Dropdown.Item onClick={() => this.recordMediaUser("audio")}>
                  Аудио
              </Dropdown.Item>
              </DropdownButton>
              :
              <Button style={{ marginLeft: "2px", border: '1px solid black', borderRadius: '5px' }} variant='secondary' disabled>
                <div>
                  <img style={{ height: '20px' }} src={loadMedia} alt="Loading" />
                  <span> Ждите...</span>
                </div></Button>
          ) : (
              <Button variant="warning" style={{ marginLeft: "2px", border: '1px solid black' }}
                onClick={() => { if (this.mediaRecorder) this.mediaRecorder.stop() }}>
                <Timer /> Стоп
            </Button>
            )}

          <Button
            disabled={this.state.addBtn}
            style={{ marginLeft: "2px", border: '1px solid black' }}
            variant="success"
            onClick={this.addPost}
          >
            Добавить
          </Button>
        </InputGroup>

        <div
          style={{
            width: "100%",
            paddingTop: "42px",
          }}
        >
          <div className={!this.state.recordVideo ? styles.displayNone : ''}>
            <video
              id='media-user-stream'
              style={{ width: "100%", border: '3px solid red' }}
              muted={true}
              ref={a => this.video = a}
            />
          </div>
        </div>

        <Modal
          show={this.state.error}
          onHide={() => this.setState({ error: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ошибка !</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.errorText}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ error: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>


        <News {...this.props} />

      </div>
    );
  }
}

type MapStateToPropsType = {
  posts: Array<NewsPostType>
  lastSeenId: number
  prevPostsButton: boolean
  textPost: string
}

const mapStateToProps = (state: GlobalStateType): MapStateToPropsType => {
  return {
    posts: state.news.posts,
    lastSeenId: state.news.lastSeenId,
    prevPostsButton: state.news.prevPostsButton,
    textPost: state.news.textPost,
  };
};

type MapDispatchToPropsType = {
  getMyPosts: (lastSeenId: number) => void
  likePost: (postId: number) => void
  dislikePost: (postId: number) => void
  deletePost: (postId: number) => void
  addPostThunk: (content: string) => void
  textPostAdd: (textPost: string) => void
  saveMediaFile: (file: File | Blob, type: string) => void
}
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalStateType>(mapStateToProps, {
  getMyPosts,
  likePost,
  dislikePost,
  deletePost,
  addPostThunk,
  textPostAdd: actionsNews.textPostAdd,
  saveMediaFile
})(NewsContainer);
