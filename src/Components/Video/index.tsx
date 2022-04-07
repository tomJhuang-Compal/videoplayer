//@ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Rect, Line, Circle, Group, Shape } from 'react-konva';
import Konva from 'konva';
import moment from 'moment';
import Hls from 'hls.js';
import secondToTime from '../../utils/secondToTime';
import * as R from 'ramda';
import useWindowDimensions from '../../utils/useWindowDimensions';
import useImage from 'use-image';

import Commercial from '../Commercial';
import QAComponent from '../Q&A';

const Video = (props: any) => {
  const { src, config } = props;
  const imageRef = useRef(null);
  const questionRef = useRef(null);
  const CMConfig = R.pathOr([], ['CM'], config);
  const QAConfig = R.pathOr([], ['Q&A'], config);
  const test = useWindowDimensions();
  const [processValue, setProcessValue] = useState(0);
  const [isShowControlPanel, setShowControlPanel] = useState(false);
  const [duration, setDuration] = useState(0);
  const [size, setSize] = useState({
    width: test.width * 0.6,
    height: test.width * 0.35,
  });
  const [hls, setHls] = useState(new Hls());
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const playButton = useRef(null);
  const playCircle = useRef(null);
  const container = useRef(null);

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const videoElement = React.useMemo(() => {
    const element = document.createElement('video');
    element.src = src;
    element.setAttribute('playsinline', '');
    element.setAttribute('controls', true);
    element.setAttribute('autoplay', 'autoplay');
    element.setAttribute('muted', true);
    element.setAttribute('loop', true);

    return element;
  }, [src]);

  // Video put in konva
  useEffect(() => {
    const layer = imageRef.current.getLayer();
    container.current.addEventListener('mouseover', over);
    container.current.addEventListener('mouseout', out);
    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => {
      // container.current.removeEventListener('mouseover', over);
      // container.current.removeEventListener('mouseout', out);
      anim.stop();
    };
  });

  useEffect(() => {
    const maxWidth = 900;
    const maxHeight = 506.25;
    setSize({
      width: test.width > maxWidth ? maxWidth : test.width * 0.6,
      height: test.width > maxWidth ? maxHeight : test.width * 0.35,
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
    pulseShape(playButton.current);
    pulseShape(playCircle.current);
    // prevent click on stage
    e.cancelBubble = true;
    videoElement.play();
  };

  const toggleReplay = (e: any) => {
    pulseShape(playButton.current);
    pulseShape(playCircle.current);
    // prevent click on stage
    e.cancelBubble = true;
    videoElement.currentTime = 0;
    videoElement.play();
  };

  const update = (e: any) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const time = (currentTime / duration) * 100;
    setProcessValue(time);
  };
  const over = () => {
    setShowControlPanel(true);
  };

  const out = () => {
    setShowControlPanel(false);
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
      //   videoEl.current.removeEventListener('timeupdate', update);
    };
  }, []);

  const toggleStop = (e) => {
    videoElement.pause();
  };

  const timeChanges = (time: any) => {
    const dateTime = new moment(time * 1000) as any;
    return dateTime.format('mm:ss');
  };

  const closeQuestion = () => {
    setIsShowQuestion(!isShowQuestion);
  };

  const pulseShape = (shape) => {
    // use Konva methods to animate a shape
    shape.to({
      scaleX: 1.5,
      scaleY: 1.5,
      onFinish: () => {
        shape.to({
          scaleX: 1,
          scaleY: 1,
        });
      },
    });
  };

  return (
    <>
      <Stage width={size.width} height={size.height}>
        <Layer ref={container}>
          <Image
            ref={imageRef}
            image={videoElement}
            x={0}
            y={0}
            stroke="red"
            width={size.width}
            height={size.height}
            onClick={toggleStop}
          />
          <Group
            x={size.width / 2}
            y={size.height / 2}
            width={50}
            visible={videoElement.paused}
            onClick={togglePlay}
          >
            <Circle
              ref={playCircle}
              radius={25}
              fill="black"
              shadowBlur={10}
              opacity={0.4}
            ></Circle>
            <Shape
              ref={playButton}
              sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(-7, -12);
                context.lineTo(-7, 12);
                context.lineTo(12, 1);
                context.closePath();
                context.fillStrokeShape(shape);
              }}
              fill="white"
            />
          </Group>
          <Commercial config={CMConfig} size={size} currentTime={processValue * duration * 0.01} />
          <QAComponent
            size={size}
            config={QAConfig}
            currentTime={processValue * duration * 0.01}
            type={2}
          />
          <Rect
            width={200}
            height={60}
            fill="yellow"
            shadowBlur={10}
            visible={isShowControlPanel}
            y={size.height - 60}
          />
        </Layer>
      </Stage>
      時間: {timeChanges(processValue * duration * 0.01)} /{timeChanges(duration)}
      <br />
      <button onClick={toggleStop}>Stop</button>
      <button onClick={togglePlay}>play</button>
      <button onClick={toggleReplay}>replay</button>
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
