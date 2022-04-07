import React from 'react';
import { Text, Group, Circle } from 'react-konva';
import * as R from 'ramda';
import { ansState } from './ansState';
import * as defaultConfig from './defaultConfig.json';

type AnsContentProps = {
  content: {
    answer: string;
    isAnswer: boolean;
  };
  index: number;
  selectAns: number | undefined;
  onClickOption: (n: number) => void;
  answerState: string;
  setting: any;
};

const RenderAnsContent: React.FC<AnsContentProps> = ({
  content,
  index,
  selectAns,
  onClickOption,
  answerState,
  setting,
}) => {
  const optionConfig = defaultConfig.options;
  const titleConfig = defaultConfig.title;
  const titleHeight = R.pathOr(
    titleConfig.fontSize + optionConfig.blankFromTitle,
    ['title', 'fontSize'],
    setting,
  );
  const titleOffsetY = R.pathOr(0, ['title', 'offsetY'], setting);
  const optionFontSize = R.pathOr(optionConfig.fontSize, ['options', 'fontSize'], setting);
  const optionOffsetX = R.pathOr(optionConfig.x, ['options', 'offsetX'], setting);
  const optionOffsetY = R.pathOr(optionConfig.y, ['options', 'offsetY'], setting);

  const fontColor = R.pathOr('blue', ['options', 'color'], setting);
  const selectColor = R.pathOr('blue', ['options', 'selectColor'], setting);
  const rightColor = R.pathOr('blue', ['options', 'rightColor'], setting);
  const wrongColor = R.pathOr('red', ['options', 'wrongColor'], setting);

  const renderOptionColor = () => {
    if (answerState === ansState.Wrong) {
      if (selectAns === index) {
        return wrongColor;
      }
      if (content.isAnswer) {
        return rightColor;
      }
    }

    return selectAns === index ? selectColor : fontColor;
  };

  return (
    <Group
      x={optionOffsetX}
      y={titleHeight + titleOffsetY + optionOffsetY}
      width={300}
      height={100}
    >
      <Circle
        x={6}
        y={index * optionFontSize + optionFontSize / 2}
        radius={6}
        fill={renderOptionColor()}
        onClick={() => {
          answerState !== ansState.UnAnswer ? {} : onClickOption(index);
        }}
      />
      <Text
        text={content.answer}
        fontSize={optionFontSize}
        fill={renderOptionColor()}
        x={18}
        y={index * optionFontSize}
      />
    </Group>
  );
};

export default RenderAnsContent;
