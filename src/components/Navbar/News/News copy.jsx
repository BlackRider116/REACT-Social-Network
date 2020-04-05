/* eslint-env browser */
import React from 'react';
import Bird from "./sounds/birds.mp3"
const audioType = 'audio/*';

class RecordingAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: [],
    };
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    // show it to user - покажите его пользователю
    this.audio.src = window.URL.createObjectURL(stream);
    this.audio.play();
    // init recording - запись init
    this.mediaRecorder = new MediaRecorder(stream);
    // init data storage for video chunks - хранилище данных init для видеофрагментов
    this.chunks = [];
    // listen for data from media recorder - прослушивание данных с носителя записи
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  startRecording(e) {
    e.preventDefault();
    // wipe old data chunks - стереть старые куски данных
    this.chunks = [];
    // start recorder with 10ms buffer - стартовый рекордер с буфером 10 мс
    this.mediaRecorder.start(10);
    // say that we're recording - скажи, что мы записываем
    this.setState({recording: true});
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder - остановите диктофон
    this.mediaRecorder.stop();
    // say that we're not recording - скажи что мы не записываем
    this.setState({recording: false});
    // save the video to memory - сохраните видео в памяти
    this.saveAudio();
  }

  saveAudio() {
    // convert saved chunks to blob - преобразование сохраненных фрагментов в blob-объект
    const blob = new Blob(this.chunks, {type: audioType});
    // generate video url from blob - создать ссылку на видео из Blob
    const audioURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering - добавить URL-адрес видео в список сохраненных видео для рендеринга
    const audios = this.state.audios.concat([audioURL]);
    this.setState({audios});
  }

  deleteAudio(audioURL) {
    // filter out current videoURL from the list of saved videos - отфильтруйте текущий URL-адрес видео из списка сохраненных видео
    const audios = this.state.audios.filter(a => a !== audioURL);
    this.setState({audios});
  }

  render() {
    const {recording, audios} = this.state;

    return (
      <div className="camera">
        <audio


          style={{width: 400}}
          ref={a => {
            this.audio = a;
          }}>
         <p>Audio stream not available. </p>
        </audio>
        <div>
          {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
          {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
        </div>
        <div>
          <h3>Recorded audios:</h3>
          {audios.map((audioURL, i) => (
            <div key={`audio_${i}`}>
              <audio controls style={{width: 200}} src={audioURL}   />
              <div>
                <button onClick={() => this.deleteAudio(audioURL)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default RecordingAPI