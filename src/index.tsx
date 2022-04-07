import React from 'react';
import styles from './index.module.css';
import Video from './Components/Video';
import VideoWithPic from './Components/VideoWithPic';

type VideoProps = {
  src: string;
  config: any;
};

export const VideoPlayer: React.FC<VideoProps> = ({ src, config }) => {
  return (
    <div className={styles.container}>
      <Video src={src} config={config} />
    </div>
  );
};

export const VideoPlayerWithPic: React.FC<VideoProps> = ({ src, config }) => {
  return (
    <div className={styles.container}>
      <VideoWithPic src={src} config={config} />
    </div>
  );
};
