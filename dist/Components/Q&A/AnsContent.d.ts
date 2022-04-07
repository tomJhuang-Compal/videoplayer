import React from 'react';
declare type AnsContentProps = {
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
declare const RenderAnsContent: React.FC<AnsContentProps>;
export default RenderAnsContent;
