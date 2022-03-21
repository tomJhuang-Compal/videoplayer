//@ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
import Konva from 'konva';
import moment from 'moment';
import Hls from 'hls.js';
import secondToTime from '../../utils/secondToTime';
import * as R from 'ramda';
import useWindowDimensions from '../../utils/useWindowDimensions';
import useImage from 'use-image';

import Commercial from '../Commercial';

const Video = (props: any) => {
  const { src, config } = props;
  const imageRef = useRef(null);
  const CMConfig = R.pathOr([], ['CM'], config);
  const test = useWindowDimensions();
  const [processValue, setProcessValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [size, setSize] = useState({
    width: test.width * 0.6,
    height: test.width * 0.35,
  });
  const [hls, setHls] = useState(new Hls());

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const videoElement = React.useMemo(() => {
    const element = document.createElement('video');
    element.src = src;

    element.setAttribute('playsinline', '');

    return element;
  }, [src]);

  // Video put in konva
  useEffect(() => {
    const layer = imageRef.current.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => anim.stop();
  });

  useEffect(() => {
    setSize({
      width: test.width * 0.6,
      height: test.width * 0.35,
    });
  }, [test]);

  useEffect(() => {
    if (videoElement) {
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src);
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      setHls(new Hls());
    };
  }, []);

  // when video is loaded, we should read it size
  useEffect(() => {
    const onload = function () {
      setDuration(videoElement.duration);
    };
    videoElement.addEventListener('loadedmetadata', onload);

    return () => {
      videoElement.removeEventListener('loadedmetadata', onload);
    };
  }, [videoElement]);

  const togglePlay = (e: any) => {
    videoElement.play();
  };

  const update = (e: any) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const time = (currentTime / duration) * 100;
    setProcessValue(time);
  };

  useEffect(() => {
    videoElement.addEventListener('timeupdate', update);
    window.addEventListener(
      'orientationchange',
      function () {
        // Announce the new orientation number
        alert(window.orientation);
      },
      false,
    );

    return () => {
      // videoEl.current.removeEventListener("timeupdate", update);
    };
  }, []);

  const toggleStop = (e) => {
    videoElement.pause();
  };

  const timeChanges = (time: any) => {
    const dateTime = new moment(time * 1000) as any;
    return dateTime.format('mm:ss');
  };

  return (
    <>
      <Stage width={size.width} height={size.height}>
        <Layer>
          <Image
            ref={imageRef}
            image={videoElement}
            x={0}
            y={0}
            stroke="red"
            width={size.width}
            height={size.height}
          />
          <Commercial config={CMConfig} size={size} currentTime={processValue * duration * 0.01} />
        </Layer>
      </Stage>
      時間: {timeChanges(processValue * duration * 0.01)} /{timeChanges(duration)}
      <br />
      <button onClick={toggleStop}>Stop</button>
      <button onClick={togglePlay}>play</button>
      <br />
      <button
        onClick={() => {
          setSize({
            width: test.width,
            height: (videoElement.videoHeight * test.width) / videoElement.videoWidth,
          });
        }}
      >
        Full screen
      </button>
      <button
        onClick={() => {
          setSize({
            width: test.width * 0.6,
            height: test.width * 0.35,
          });
        }}
      >
        Origin screen
      </button>
    </>
  );
};

export default Video;
