import React from 'react';
import styles from './index.module.css';
import Video from './Components/Video';

type VideoProps = {
  src: string;
  config: any;
};

const Counter: React.FC<VideoProps> = ({ src, config }) => {
  return (
    <div className={styles.container}>
      <Video src={src} config={config} />
    </div>
  );
};

export default Counter;
