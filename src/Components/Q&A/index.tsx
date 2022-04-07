import React, { useEffect, useState } from 'react';
import { Rect, Line, Text, Group } from 'react-konva';

import moment from 'moment';
import * as R from 'ramda';

import RenderAnsContent from './AnsContent';
import { ansState, ansStateText } from './ansState';
import * as defaultConfig from './defaultConfig.json';

type QAComponentProps = {
  config: any;
  currentTime: number;
  type: number;
  size: {
    width: number;
    height: number;
  };
};

const QAComponent: React.FC<QAComponentProps> = ({ size, config, currentTime, type }) => {
  const data = config;
  const [isShowQuestion, setIsShowQuestion] = useState(false);
  const [closeQuestionTime, setCloseQuestionTime] = useState(0);
  const [ansContent, setAnsContent] = useState<
    Array<{
      answer: string;
      isAnswer: boolean;
    }>
  >([]);
  const [selectAns, setSelectAns] = useState<number | undefined>(undefined);
  const [answerState, setAnswerState] = useState<string>(ansState.UnAnswer);
  const [countTime, setCountTime] = useState<number>(0);
  const [questionSetting, setQuestingSetting] = useState({});

  const titleDefaultConfig = defaultConfig.title;
  const windowConfig = defaultConfig.window;
  const closeCrossConfig = defaultConfig.closeCross;

  const width = type === 2 ? size.width * windowConfig.ratio : 200;
  const height = type === 2 ? size.height * windowConfig.ratio : 100;
  const x = type === 2 ? size.width / 2 - width / 2 : 100;
  const y = type === 2 ? size.height / 2 - height / 2 : 60;

  const tick = () => {
    if (countTime > 0) {
      setTimeout(() => {
        setCountTime(countTime - 1);
      }, 1000);
    }
    return String(countTime);
  };

  const checkQATime = () => {
    for (let i = 0; i < data.length; i++) {
      const startTime = R.pathOr('', [i, 'start'], data);
      const keepTime = R.pathOr(0, [i, 'keep'], data);
      if (Math.round(currentTime) === moment.duration(startTime).asMinutes()) {
        setIsShowQuestion(true);
        setCloseQuestionTime(Math.round(currentTime) + keepTime + 1);
        setAnsContent(R.pathOr([], [i, 'options', 'content'], data));
        setCountTime(keepTime);
        setQuestingSetting(R.pathOr({}, [i], data));
      }
      if (Math.round(currentTime) === closeQuestionTime) {
        setIsShowQuestion(false);
        setAnsContent([]);
        setSelectAns(undefined);
        setAnswerState(ansState.UnAnswer);
        setCountTime(0);
        setQuestingSetting({});
      }
    }
  };

  useEffect(() => {
    checkQATime();
  });

  const checkAnswer = () => {
    const rightAnswerIndex = ansContent.findIndex((option) => option.isAnswer === true);
    const isAnswerRight = rightAnswerIndex === selectAns;

    if (isAnswerRight) {
      setAnswerState(ansState.Right);
    } else {
      setAnswerState(ansState.Wrong);
    }
  };

  return (
    <>
      <Group draggable x={x} y={y} width={width} height={height} visible={isShowQuestion}>
        <Rect
          width={width}
          height={height}
          fill={R.pathOr(
            windowConfig.backgroundColor,
            ['window', 'backgroundColor'],
            questionSetting,
          )}
          shadowBlur={10}
          cornerRadius={R.pathOr(
            windowConfig.cornerRadius,
            ['window', 'cornerRadius'],
            questionSetting,
          )}
        />
        <Text
          text={R.pathOr('', ['title', 'question'], questionSetting)}
          fontSize={R.pathOr(titleDefaultConfig.fontSize, ['title', 'fontSize'], questionSetting)}
          fill={R.pathOr(titleDefaultConfig.color, ['title', 'color'], questionSetting)}
          x={R.pathOr(titleDefaultConfig.x, ['title', 'offsetX'], questionSetting)}
          y={R.pathOr(titleDefaultConfig.y, ['title', 'offsetY'], questionSetting)}
        />
        {ansContent.map((item, index) => (
          <RenderAnsContent
            content={item}
            index={index}
            selectAns={selectAns}
            onClickOption={setSelectAns}
            answerState={answerState}
            setting={questionSetting}
          />
        ))}
        {/* Close Cross*/}
        <Group
          x={width - R.pathOr(closeCrossConfig.x, ['closeCross', 'offsetX'], questionSetting)}
          y={4}
          onClick={() => {
            setIsShowQuestion(false);
          }}
          width={R.pathOr(closeCrossConfig.width, ['closeCross', 'width'], questionSetting)}
          height={R.pathOr(closeCrossConfig.width, ['closeCross', 'height'], questionSetting)}
        >
          <Line
            points={[
              0,
              0,
              R.pathOr(closeCrossConfig.width, ['closeCross', 'width'], questionSetting),
              R.pathOr(closeCrossConfig.width, ['closeCross', 'height'], questionSetting),
            ]}
            stroke={R.pathOr(closeCrossConfig.color, ['closeCross', 'color'], questionSetting)}
            strokeWidth={R.pathOr(
              closeCrossConfig.strokeWidth,
              ['closeCross', 'strokeWidth'],
              questionSetting,
            )}
            lineCap={'round'}
            lineJoin={'round'}
            onClick={() => {
              setIsShowQuestion(false);
            }}
          />
          <Line
            points={[
              0,
              R.pathOr(closeCrossConfig.width, ['closeCross', 'height'], questionSetting),
              R.pathOr(closeCrossConfig.width, ['closeCross', 'width'], questionSetting),
              0,
            ]}
            stroke={R.pathOr(closeCrossConfig.color, ['closeCross', 'color'], questionSetting)}
            strokeWidth={R.pathOr(
              closeCrossConfig.strokeWidth,
              ['closeCross', 'strokeWidth'],
              questionSetting,
            )}
            lineCap={'round'}
            lineJoin={'round'}
            onClick={() => {
              setIsShowQuestion(false);
            }}
          />
        </Group>
        {/* button */}
        <Group
          x={width - 70}
          y={height - 40}
          onClick={() => {
            checkAnswer();
          }}
        >
          <Rect width={50} height={25} fill="blue" shadowBlur={6} />
          <Text text={'確定'} fontSize={15} fill={'white'} x={10} y={5} />
        </Group>
        <Text
          x={width - 130}
          y={height / 2 + 10}
          text={ansStateText[answerState]}
          fontSize={15}
          fill={'black'}
          visible={answerState !== ansState.UnAnswer}
        />
        <Text x={width - 130} y={height / 2 - 20} text={tick()} fontSize={15} fill={'black'} />
      </Group>
    </>
  );
};

export default QAComponent;
