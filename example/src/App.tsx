import { useState } from 'react';
import { VideoPlayer, VideoPlayerWithPic } from 'video-player-test';
import './App.css';
import videoConfig from './videoConfig.json';
import JSONEditor from './JSONEditor';
import videoPicConfig from './videoPicConfig.json';

const styles = {
  tag: {
    margin: '5px 5px',
  },
};

function App() {
  const [value, setValue] = useState(videoConfig);
  const [valuePic, setValuePic] = useState(videoPicConfig);
  const [tag, setTag] = useState('1');

  const onChangeValue = (changeValue: any) => {
    setValue(changeValue);
  };

  return (
    <div style={{ border: '2px red solid' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={tag === '1' ? { ...styles.tag, border: '2px blue solid' } : styles.tag}
          onClick={() => {
            setTag('1');
          }}
        >
          Vide player
        </div>
        <div
          style={tag === '2' ? { ...styles.tag, border: '2px blue solid' } : styles.tag}
          onClick={() => {
            setTag('2');
          }}
        >
          Vide player with pic
        </div>
      </div>
      {tag === '1' ? (
        <>
          <VideoPlayer
            src="https://player.vimeo.com/external/685303927.m3u8?s=7d558b13eb18c59c1e8619c1b340a431c94751b0"
            config={value}
          />
          <JSONEditor data={value} onChangeValue={onChangeValue} />
        </>
      ) : (
        <>
          <VideoPlayerWithPic
            src="https://player.vimeo.com/external/685303927.m3u8?s=7d558b13eb18c59c1e8619c1b340a431c94751b0"
            config={valuePic}
          ></VideoPlayerWithPic>
        </>
      )}
    </div>
  );
}

export default App;
