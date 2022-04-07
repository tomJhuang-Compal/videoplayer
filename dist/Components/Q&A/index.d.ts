import React from 'react';
declare type QAComponentProps = {
    config: any;
    currentTime: number;
    type: number;
    size: {
        width: number;
        height: number;
    };
};
declare const QAComponent: React.FC<QAComponentProps>;
export default QAComponent;
