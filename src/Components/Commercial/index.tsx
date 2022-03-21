//@ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
import useImage from 'use-image';
import * as R from 'ramda';
import moment from 'moment';
import Konva from 'konva';

const ImageBlock = (props: any) => {
  const { url, x, y, width, height, onClick } = props;
  const [image] = useImage(url);
  return <Image image={image} x={x} y={y} width={width} height={height} onClick={onClick} />;
};

const Commercial = ({ size, currentTime, config }) => {
  const imageRef = useRef(null);
  const [CMLocation, setCMLocation] = useState('');
  const [CMData, setCMData] = useState(config);
  const [CMIndex, setCMIndex] = useState(0);
  const [inputData, setInputData] = useState(config);
  const [CMImgSrc, setCMImgSrc] = useState('');
  const [isShowRect, setIsShowRect] = useState('');

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

  const renderRect = () => {
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
          onClick={() => {}}
        ></Rect>
        <Line
          points={[x + width - 10, y, x + width, y + 10]}
          stroke={'red'}
          strokeWidth={2}
          lineCap={'round'}
          lineJoin={'round'}
          onClick={() => {}}
        />
        <Line
          points={[x + width, y, x + width - 10, y + 10]}
          stroke={'red'}
          strokeWidth={2}
          lineCap={'round'}
          lineJoin={'round'}
          onClick={() => {}}
        />
      </>
    );
  };

  const changeTime = (data) => {
    return data.map((item) => {
      const start = moment.duration(item.start).asMinutes();
      const end = moment.duration(item.end).asMinutes();
      const location = item.location;
      const imgSrc = item.imgSrc;

      return {
        start,
        end,
        location,
        imgSrc,
      };
    });
  };

  const renderCM = () => {
    const data = changeTime(CMData);

    const checkIsInTime = () => {
      for (let i = 0; i < data.length; i++) {
        if (
          currentTime >= R.pathOr(0, [i, 'start'], data) &&
          currentTime <= R.pathOr(0, [i, 'end'], data)
        ) {
          return [R.pathOr('', [i, 'location'], data), i, R.pathOr('', [i, 'imgSrc'], data)];
        }
      }
    };

    const result = checkIsInTime();

    setCMLocation(R.pathOr('', [0], result));
    setCMImgSrc(R.pathOr('', [2], result));
  };

  useEffect(() => {
    renderCM();
  });
  return renderRect();
};

export default Commercial;
