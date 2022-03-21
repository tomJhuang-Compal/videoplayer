import VideoPlayer from 'video-player-test';
import './App.css';
import videoConfig from './videoConfig.json';

function App() {
  return (
    <div className="App">
      <VideoPlayer
        src="https://player.vimeo.com/external/685303927.m3u8?s=7d558b13eb18c59c1e8619c1b340a431c94751b0"
        config={videoConfig}
      />
    </div>
  );
}

export default App;
