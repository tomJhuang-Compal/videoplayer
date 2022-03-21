//@ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
import Konva from 'konva';
import moment from 'moment';
import Hls from 'hls.js';
import secondToTime from './utils/secondToTime';
import * as R from 'ramda';
import useWindowDimensions from './utils/useWindowDimensions';
import useImage from 'use-image';
import styles from './index.module.css';

const CMSetting = [
  {
    start: '00:02',
    end: '00:10',
    location: 'RT',
    imgSrc: 'https://i.imgur.com/Qkowlg5.jpg',
  },
  {
    start: '00:14',
    end: '00:20',
    location: 'LT',
    imgSrc: 'https://i.imgur.com/Q0CKukh.jpg',
  },
  {
    start: '00:26',
    end: '00:30',
    location: 'BM',
    imgSrc: 'https://i.imgur.com/VFxAKxG.jpg',
  },
];

const ImageBlock = (props: any) => {
  const { url, x, y, width, height, onClick } = props;
  const [image] = useImage(url);
  return <Image image={image} x={x} y={y} width={width} height={height} onClick={onClick} />;
};

const Video = (props: any) => {
  const { src } = props;
  const test = useWindowDimensions();
  const imageRef = useRef(null);
  const [processValue, setProcessValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [size, setSize] = useState({
    width: test.width * 0.6,
    height: test.width * 0.35,
  });
  const [hls, setHls] = useState(new Hls());
  const [isShowRect, setIsShowRect] = useState('');
  const [CMLocation, setCMLocation] = useState('');
  const [CMData, setCMData] = useState(CMSetting);
  const [CMIndex, setCMIndex] = useState(0);
  const [inputData, setInputData] = useState(CMSetting);
  const [CMImgSrc, setCMImgSrc] = useState('');

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const videoElement = React.useMemo(() => {
    const element = document.createElement('video');
    element.src = src;

    element.setAttribute('playsinline', '');

    return element;
  }, [src]);

  const setting = {
    RT: {
      x: size.width - 100,
      y: 0,
      width: 100,
      height: 100,
    },
    LT: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    },
    BM: {
      x: (size.width - 200) / 2,
      y: size.height - 50,
      width: 200,
      height: 50,
    },
  };

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

  // use Konva.Animation to redraw a layer
  useEffect(() => {
    videoElement.play();
    const layer = imageRef.current.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => anim.stop();
  }, [videoElement]);

  const togglePlay = (e: any) => {
    videoElement.play();
  };

  const update = (e: any) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const time = (currentTime / duration) * 100;
    setProcessValue(time);
    if (!isShowRect) {
      renderCM(secondToTime(time * duration * 0.01));
    }
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

  const changeTime = (data) => {
    return data.map((item) => {
      const start = moment.duration(item.start).asMinutes();
      const end = moment.duration(item.end).asMinutes();
      const location = item.location;
      const isSkip = item.isSkip;
      const imgSrc = item.imgSrc;

      return {
        start,
        end,
        location,
        isSkip,
        imgSrc,
      };
    });
  };

  const clseCM = () => {
    const currentCM = R.pathOr([], [CMIndex], CMData);

    const res = CMData.map((obj, index) => {
      if (index === CMIndex) {
        return { ...currentCM, isSkip: true };
      } else return obj;
    });

    setCMData(res);
  };

  const renderRect = (isShow) => {
    if (isShowRect) {
      const x = R.pathOr(0, [CMLocation, 'x'], setting);
      const y = R.pathOr(0, [CMLocation, 'y'], setting);
      const width = R.pathOr(0, [CMLocation, 'width'], setting);
      const height = R.pathOr(0, [CMLocation, 'height'], setting);
      const image = CMImgSrc;

      return (
        <>
          <ImageBlock
            url={image}
            x={x}
            y={y}
            width={width}
            height={height}
            onClick={() => {
              window.open('https://shopping.pchome.com.tw/', '_blank');
            }}
          />
          <Rect
            x={x + width - width / 10}
            y={y}
            width={width / 10}
            height={height / 10}
            fill="rgba(255,255,255,0.3)"
            onClick={() => {
              clseCM();
            }}
          ></Rect>
          <Line
            points={[x + width - 10, y, x + width, y + 10]}
            stroke={'red'}
            strokeWidth={2}
            lineCap={'round'}
            lineJoin={'round'}
            onClick={() => {
              clseCM();
            }}
          />
          <Line
            points={[x + width, y, x + width - 10, y + 10]}
            stroke={'red'}
            strokeWidth={2}
            lineCap={'round'}
            lineJoin={'round'}
            onClick={() => {
              clseCM();
            }}
          />
        </>
      );
    }
    return null;
  };

  const renderCM = (time) => {
    const currentTime = moment.duration(time).asMinutes();
    const data = changeTime(CMData);

    const checkIsInTime = () => {
      for (let i = 0; i < data.length; i++) {
        // const isShow = inRange(currentTime, data[i].start, data[i].end);
        const isSkip = R.pathOr(false, [i, 'isSkip'], data);

        if (isSkip) {
          return null;
        } else if (
          currentTime >= R.pathOr(0, [i, 'start'], data) &&
          currentTime <= R.pathOr(0, [i, 'end'], data)
        ) {
          return [
            R.pathOr('', [i, 'location'], data),
            i,
            isSkip,
            R.pathOr('', [i, 'imgSrc'], data),
          ];
        }
      }
    };

    const isHaveLocation = checkIsInTime();

    if (isHaveLocation) {
      setCMLocation(isHaveLocation[0]);
      setCMIndex(isHaveLocation[1]);
      setCMImgSrc(isHaveLocation[3]);
      setIsShowRect(true);
    } else {
      setCMLocation('');
      setIsShowRect(false);
      setCMIndex(0);
      setCMImgSrc('');
    }
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

          {renderRect()}
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
      <textarea
        style={{ width: 400, height: 200 }}
        value={JSON.stringify(inputData, undefined, 2)}
        onChange={(e) => {
          const inputValue = e.target.value;
          setInputData(JSON.parse(inputValue));
        }}
      />
    </>
  );
};

type CounterProps = {
  src: string;
};

const Counter: React.FC<CounterProps> = ({ src }) => {
  return (
    <div className={styles.container}>
      <Video src={src} />
    </div>
  );
};

export default Counter;
