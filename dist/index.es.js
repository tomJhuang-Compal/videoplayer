import React, { useState, useEffect, useRef } from 'react';
import { Rect, Line, Image, Group, Circle, Text, Stage, Layer, Shape } from 'react-konva';
import Konva from 'konva';
import moment from 'moment';
import Hls from 'hls.js';
import * as R from 'ramda';
import useImage from 'use-image';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".index-module_container__p6aGD {\n  border: 2px blue solid;\n  padding: 20px;\n}\n.index-module_hiContainer__1Du0B {\n  border: 2px red solid;\n}\n.index-module_erContainer__3XZBc {\n  border: 2px green solid;\n}\n.index-module_good___eiXH {\n  border: 2px green solid;\n}\n.index-module_testXX__XtPzk {\n  border: 2px red solid;\n}\n.index-module_ggyy__2F8mg {\n  border: 2px red solid;\n}\n.index-module_kk__1OZTB {\n  border: 2px red solid;\n}\n.index-module_how___jDc8 {\n  border: 2px red solid;\n}\n.index-module_sdsff__1crom {\n  border: 2px green solid;\n}\n";
var styles = {"container":"index-module_container__p6aGD","hiContainer":"index-module_hiContainer__1Du0B","erContainer":"index-module_erContainer__3XZBc","good":"index-module_good___eiXH","testXX":"index-module_testXX__XtPzk","ggyy":"index-module_ggyy__2F8mg","kk":"index-module_kk__1OZTB","how":"index-module_how___jDc8","sdsff":"index-module_sdsff__1crom","testXx":"index-module_testXX__XtPzk"};
styleInject(css_248z);

//@ts-nocheck
function getWindowDimensions() {
    var width = window.innerWidth, height = window.innerHeight;
    return {
        width: width,
        height: height,
    };
}
function useWindowDimensions() {
    var _a = useState(getWindowDimensions()), windowDimensions = _a[0], setWindowDimensions = _a[1];
    useEffect(function () {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, []);
    return windowDimensions;
}

//@ts-nocheck
var ImageBlock = function (props) {
    var url = props.url, x = props.x, y = props.y, width = props.width, height = props.height, onClick = props.onClick;
    var image = useImage(url)[0];
    return React.createElement(Image, { image: image, x: x, y: y, width: width, height: height, onClick: onClick });
};
var Commercial = function (_a) {
    var size = _a.size, currentTime = _a.currentTime, config = _a.config;
    useRef(null);
    var _b = useState(''), CMLocation = _b[0], setCMLocation = _b[1];
    var _c = useState(config), CMData = _c[0]; _c[1];
    var _d = useState(0); _d[0]; _d[1];
    var _e = useState(config); _e[0]; _e[1];
    var _f = useState(''), CMImgSrc = _f[0], setCMImgSrc = _f[1];
    var _g = useState(''); _g[0]; _g[1];
    var setting = {
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
    var renderRect = function () {
        var x = R.pathOr(0, [CMLocation, 'x'], setting);
        var y = R.pathOr(0, [CMLocation, 'y'], setting);
        var width = R.pathOr(0, [CMLocation, 'width'], setting);
        var height = R.pathOr(0, [CMLocation, 'height'], setting);
        var image = CMImgSrc;
        return (React.createElement(React.Fragment, null,
            React.createElement(ImageBlock, { url: image, x: x, y: y, width: width, height: height, onClick: function () {
                    window.open('https://shopping.pchome.com.tw/', '_blank');
                } }),
            React.createElement(Rect, { x: x + width - width / 10, y: y, width: width / 10, height: height / 10, fill: "rgba(255,255,255,0.3)", onClick: function () { } }),
            React.createElement(Line, { points: [x + width - 10, y, x + width, y + 10], stroke: 'red', strokeWidth: 2, lineCap: 'round', lineJoin: 'round', onClick: function () { } }),
            React.createElement(Line, { points: [x + width, y, x + width - 10, y + 10], stroke: 'red', strokeWidth: 2, lineCap: 'round', lineJoin: 'round', onClick: function () { } })));
    };
    var changeTime = function (data) {
        return data.map(function (item) {
            var start = moment.duration(item.start).asMinutes();
            var end = moment.duration(item.end).asMinutes();
            var location = item.location;
            var imgSrc = item.imgSrc;
            return {
                start: start,
                end: end,
                location: location,
                imgSrc: imgSrc,
            };
        });
    };
    var renderCM = function () {
        var data = changeTime(CMData);
        var checkIsInTime = function () {
            for (var i = 0; i < data.length; i++) {
                if (currentTime >= R.pathOr(0, [i, 'start'], data) &&
                    currentTime <= R.pathOr(0, [i, 'end'], data)) {
                    return [R.pathOr('', [i, 'location'], data), i, R.pathOr('', [i, 'imgSrc'], data)];
                }
            }
        };
        var result = checkIsInTime();
        setCMLocation(R.pathOr('', [0], result));
        setCMImgSrc(R.pathOr('', [2], result));
    };
    useEffect(function () {
        renderCM();
    });
    return renderRect();
};

var ansState = {
    UnAnswer: 'UnAnswer',
    Right: 'Right',
    Wrong: 'Wrong',
};
var ansStateText = {
    UnAnswer: '未作答',
    Right: '答對',
    Wrong: '答錯',
};

var title = {
	fontSize: 20,
	color: "black",
	x: 3,
	y: 5
};
var options = {
	blankFromTitle: 2,
	fontSize: 20,
	color: "yellow",
	selectColor: "blue",
	rightColor: "blue",
	wrongColor: "red",
	x: 3,
	y: 5
};
var closeCross = {
	x: 14,
	y: 3,
	width: 10,
	height: 10,
	strokeWidth: 2,
	color: "red"
};
var window$1 = {
	ratio: 0.8,
	backgroundColor: "white",
	cornerRadius: 10
};

var RenderAnsContent = function (_a) {
    var content = _a.content, index = _a.index, selectAns = _a.selectAns, onClickOption = _a.onClickOption, answerState = _a.answerState, setting = _a.setting;
    var optionConfig = options;
    var titleConfig = title;
    var titleHeight = R.pathOr(titleConfig.fontSize + optionConfig.blankFromTitle, ['title', 'fontSize'], setting);
    var titleOffsetY = R.pathOr(0, ['title', 'offsetY'], setting);
    var optionFontSize = R.pathOr(optionConfig.fontSize, ['options', 'fontSize'], setting);
    var optionOffsetX = R.pathOr(optionConfig.x, ['options', 'offsetX'], setting);
    var optionOffsetY = R.pathOr(optionConfig.y, ['options', 'offsetY'], setting);
    var fontColor = R.pathOr('blue', ['options', 'color'], setting);
    var selectColor = R.pathOr('blue', ['options', 'selectColor'], setting);
    var rightColor = R.pathOr('blue', ['options', 'rightColor'], setting);
    var wrongColor = R.pathOr('red', ['options', 'wrongColor'], setting);
    var renderOptionColor = function () {
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
    return (React.createElement(Group, { x: optionOffsetX, y: titleHeight + titleOffsetY + optionOffsetY, width: 300, height: 100 },
        React.createElement(Circle, { x: 6, y: index * optionFontSize + optionFontSize / 2, radius: 6, fill: renderOptionColor(), onClick: function () {
                answerState !== ansState.UnAnswer ? {} : onClickOption(index);
            } }),
        React.createElement(Text, { text: content.answer, fontSize: optionFontSize, fill: renderOptionColor(), x: 18, y: index * optionFontSize })));
};

var QAComponent = function (_a) {
    var size = _a.size, config = _a.config, currentTime = _a.currentTime, type = _a.type;
    var data = config;
    var _b = useState(false), isShowQuestion = _b[0], setIsShowQuestion = _b[1];
    var _c = useState(0), closeQuestionTime = _c[0], setCloseQuestionTime = _c[1];
    var _d = useState([]), ansContent = _d[0], setAnsContent = _d[1];
    var _e = useState(undefined), selectAns = _e[0], setSelectAns = _e[1];
    var _f = useState(ansState.UnAnswer), answerState = _f[0], setAnswerState = _f[1];
    var _g = useState(0), countTime = _g[0], setCountTime = _g[1];
    var _h = useState({}), questionSetting = _h[0], setQuestingSetting = _h[1];
    var titleDefaultConfig = title;
    var windowConfig = window$1;
    var closeCrossConfig = closeCross;
    var width = type === 2 ? size.width * windowConfig.ratio : 200;
    var height = type === 2 ? size.height * windowConfig.ratio : 100;
    var x = type === 2 ? size.width / 2 - width / 2 : 100;
    var y = type === 2 ? size.height / 2 - height / 2 : 60;
    var tick = function () {
        if (countTime > 0) {
            setTimeout(function () {
                setCountTime(countTime - 1);
            }, 1000);
        }
        return String(countTime);
    };
    var checkQATime = function () {
        for (var i = 0; i < data.length; i++) {
            var startTime = R.pathOr('', [i, 'start'], data);
            var keepTime = R.pathOr(0, [i, 'keep'], data);
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
    useEffect(function () {
        checkQATime();
    });
    var checkAnswer = function () {
        var rightAnswerIndex = ansContent.findIndex(function (option) { return option.isAnswer === true; });
        var isAnswerRight = rightAnswerIndex === selectAns;
        if (isAnswerRight) {
            setAnswerState(ansState.Right);
        }
        else {
            setAnswerState(ansState.Wrong);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Group, { draggable: true, x: x, y: y, width: width, height: height, visible: isShowQuestion },
            React.createElement(Rect, { width: width, height: height, fill: R.pathOr(windowConfig.backgroundColor, ['window', 'backgroundColor'], questionSetting), shadowBlur: 10, cornerRadius: R.pathOr(windowConfig.cornerRadius, ['window', 'cornerRadius'], questionSetting) }),
            React.createElement(Text, { text: R.pathOr('', ['title', 'question'], questionSetting), fontSize: R.pathOr(titleDefaultConfig.fontSize, ['title', 'fontSize'], questionSetting), fill: R.pathOr(titleDefaultConfig.color, ['title', 'color'], questionSetting), x: R.pathOr(titleDefaultConfig.x, ['title', 'offsetX'], questionSetting), y: R.pathOr(titleDefaultConfig.y, ['title', 'offsetY'], questionSetting) }),
            ansContent.map(function (item, index) { return (React.createElement(RenderAnsContent, { content: item, index: index, selectAns: selectAns, onClickOption: setSelectAns, answerState: answerState, setting: questionSetting })); }),
            React.createElement(Group, { x: width - R.pathOr(closeCrossConfig.x, ['closeCross', 'offsetX'], questionSetting), y: 4, onClick: function () {
                    setIsShowQuestion(false);
                }, width: R.pathOr(closeCrossConfig.width, ['closeCross', 'width'], questionSetting), height: R.pathOr(closeCrossConfig.width, ['closeCross', 'height'], questionSetting) },
                React.createElement(Line, { points: [
                        0,
                        0,
                        R.pathOr(closeCrossConfig.width, ['closeCross', 'width'], questionSetting),
                        R.pathOr(closeCrossConfig.width, ['closeCross', 'height'], questionSetting),
                    ], stroke: R.pathOr(closeCrossConfig.color, ['closeCross', 'color'], questionSetting), strokeWidth: R.pathOr(closeCrossConfig.strokeWidth, ['closeCross', 'strokeWidth'], questionSetting), lineCap: 'round', lineJoin: 'round', onClick: function () {
                        setIsShowQuestion(false);
                    } }),
                React.createElement(Line, { points: [
                        0,
                        R.pathOr(closeCrossConfig.width, ['closeCross', 'height'], questionSetting),
                        R.pathOr(closeCrossConfig.width, ['closeCross', 'width'], questionSetting),
                        0,
                    ], stroke: R.pathOr(closeCrossConfig.color, ['closeCross', 'color'], questionSetting), strokeWidth: R.pathOr(closeCrossConfig.strokeWidth, ['closeCross', 'strokeWidth'], questionSetting), lineCap: 'round', lineJoin: 'round', onClick: function () {
                        setIsShowQuestion(false);
                    } })),
            React.createElement(Group, { x: width - 70, y: height - 40, onClick: function () {
                    checkAnswer();
                } },
                React.createElement(Rect, { width: 50, height: 25, fill: "blue", shadowBlur: 6 }),
                React.createElement(Text, { text: '確定', fontSize: 15, fill: 'white', x: 10, y: 5 })),
            React.createElement(Text, { x: width - 130, y: height / 2 + 10, text: ansStateText[answerState], fontSize: 15, fill: 'black', visible: answerState !== ansState.UnAnswer }),
            React.createElement(Text, { x: width - 130, y: height / 2 - 20, text: tick(), fontSize: 15, fill: 'black' }))));
};

//@ts-nocheck
var Video = function (props) {
    var src = props.src, config = props.config;
    var imageRef = useRef(null);
    useRef(null);
    var CMConfig = R.pathOr([], ['CM'], config);
    var QAConfig = R.pathOr([], ['Q&A'], config);
    var test = useWindowDimensions();
    var _a = useState(0), processValue = _a[0], setProcessValue = _a[1];
    var _b = useState(false), isShowControlPanel = _b[0], setShowControlPanel = _b[1];
    var _c = useState(0), duration = _c[0], setDuration = _c[1];
    var _d = useState({
        width: test.width * 0.6,
        height: test.width * 0.35,
    }), size = _d[0], setSize = _d[1];
    var _e = useState(new Hls()), hls = _e[0], setHls = _e[1];
    var _f = useState(true); _f[0]; _f[1];
    var playButton = useRef(null);
    var playCircle = useRef(null);
    var container = useRef(null);
    // we need to use "useMemo" here, so we don't create new video elment on any render
    var videoElement = React.useMemo(function () {
        var element = document.createElement('video');
        element.src = src;
        element.setAttribute('playsinline', '');
        element.setAttribute('controls', true);
        element.setAttribute('autoplay', 'autoplay');
        element.setAttribute('muted', true);
        element.setAttribute('loop', true);
        return element;
    }, [src]);
    // Video put in konva
    useEffect(function () {
        var layer = imageRef.current.getLayer();
        container.current.addEventListener('mouseover', over);
        container.current.addEventListener('mouseout', out);
        var anim = new Konva.Animation(function () { }, layer);
        anim.start();
        return function () {
            // container.current.removeEventListener('mouseover', over);
            // container.current.removeEventListener('mouseout', out);
            anim.stop();
        };
    });
    useEffect(function () {
        var maxWidth = 900;
        var maxHeight = 506.25;
        setSize({
            width: test.width > maxWidth ? maxWidth : test.width * 0.6,
            height: test.width > maxWidth ? maxHeight : test.width * 0.35,
        });
    }, [test]);
    useEffect(function () {
        if (videoElement) {
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                hls.loadSource(src);
            });
        }
        return function () {
            if (hls) {
                hls.destroy();
            }
            setHls(new Hls());
        };
    }, []);
    // when video is loaded, we should read it size
    useEffect(function () {
        var onload = function () {
            setDuration(videoElement.duration);
        };
        videoElement.addEventListener('loadedmetadata', onload);
        return function () {
            videoElement.removeEventListener('loadedmetadata', onload);
        };
    }, [videoElement]);
    var togglePlay = function (e) {
        pulseShape(playButton.current);
        pulseShape(playCircle.current);
        // prevent click on stage
        e.cancelBubble = true;
        videoElement.play();
    };
    var toggleReplay = function (e) {
        pulseShape(playButton.current);
        pulseShape(playCircle.current);
        // prevent click on stage
        e.cancelBubble = true;
        videoElement.currentTime = 0;
        videoElement.play();
    };
    var update = function (e) {
        var currentTime = e.target.currentTime;
        var duration = e.target.duration;
        var time = (currentTime / duration) * 100;
        setProcessValue(time);
    };
    var over = function () {
        setShowControlPanel(true);
    };
    var out = function () {
        setShowControlPanel(false);
    };
    useEffect(function () {
        videoElement.addEventListener('timeupdate', update);
        window.addEventListener('orientationchange', function () {
            // Announce the new orientation number
            alert(window.orientation);
        }, false);
        return function () {
            //   videoEl.current.removeEventListener('timeupdate', update);
        };
    }, []);
    var toggleStop = function (e) {
        videoElement.pause();
    };
    var timeChanges = function (time) {
        var dateTime = new moment(time * 1000);
        return dateTime.format('mm:ss');
    };
    var pulseShape = function (shape) {
        // use Konva methods to animate a shape
        shape.to({
            scaleX: 1.5,
            scaleY: 1.5,
            onFinish: function () {
                shape.to({
                    scaleX: 1,
                    scaleY: 1,
                });
            },
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Stage, { width: size.width, height: size.height },
            React.createElement(Layer, { ref: container },
                React.createElement(Image, { ref: imageRef, image: videoElement, x: 0, y: 0, stroke: "red", width: size.width, height: size.height, onClick: toggleStop }),
                React.createElement(Group, { x: size.width / 2, y: size.height / 2, width: 50, visible: videoElement.paused, onClick: togglePlay },
                    React.createElement(Circle, { ref: playCircle, radius: 25, fill: "black", shadowBlur: 10, opacity: 0.4 }),
                    React.createElement(Shape, { ref: playButton, sceneFunc: function (context, shape) {
                            context.beginPath();
                            context.moveTo(-7, -12);
                            context.lineTo(-7, 12);
                            context.lineTo(12, 1);
                            context.closePath();
                            context.fillStrokeShape(shape);
                        }, fill: "white" })),
                React.createElement(Commercial, { config: CMConfig, size: size, currentTime: processValue * duration * 0.01 }),
                React.createElement(QAComponent, { size: size, config: QAConfig, currentTime: processValue * duration * 0.01, type: 2 }),
                React.createElement(Rect, { width: 200, height: 60, fill: "yellow", shadowBlur: 10, visible: isShowControlPanel, y: size.height - 60 }))),
        "\u6642\u9593: ",
        timeChanges(processValue * duration * 0.01),
        " /",
        timeChanges(duration),
        React.createElement("br", null),
        React.createElement("button", { onClick: toggleStop }, "Stop"),
        React.createElement("button", { onClick: togglePlay }, "play"),
        React.createElement("button", { onClick: toggleReplay }, "replay"),
        React.createElement("br", null),
        React.createElement("button", { onClick: function () {
                setSize({
                    width: test.width,
                    height: (videoElement.videoHeight * test.width) / videoElement.videoWidth,
                });
            } }, "Full screen"),
        React.createElement("button", { onClick: function () {
                setSize({
                    width: test.width * 0.6,
                    height: test.width * 0.35,
                });
            } }, "Origin screen")));
};

//@ts-nocheck
var BriefingImg = function (_a) {
    var data = _a.data, width = _a.width, height = _a.height;
    var image = useImage(R.pathOr('', ['src'], data))[0];
    return React.createElement(Image, { width: width, height: height, image: image });
};
var VideoWithPic = function (props) {
    var src = props.src, config = props.config;
    var imageRef = useRef(null);
    useRef(null);
    var CMConfig = R.pathOr([], ['CM'], config);
    var QAConfig = R.pathOr([], ['Q&A'], config);
    var briefingConfig = R.pathOr([], ['briefing'], config);
    var test = useWindowDimensions();
    var _a = useState(0), processValue = _a[0], setProcessValue = _a[1];
    var _b = useState(false), isShowControlPanel = _b[0], setShowControlPanel = _b[1];
    var _c = useState(0), duration = _c[0], setDuration = _c[1];
    var _d = useState({
        width: test.width * 0.6,
        height: test.width * 0.35,
    }), size = _d[0], setSize = _d[1];
    var _e = useState(new Hls()), hls = _e[0], setHls = _e[1];
    var _f = useState(true); _f[0]; _f[1];
    var playButton = useRef(null);
    var playCircle = useRef(null);
    var container = useRef(null);
    var _g = useState(0), briefImgIndex = _g[0], setBriefImgIndex = _g[1];
    useEffect(function () {
        checkBriefingTime();
    });
    var checkBriefingTime = function () {
        var nextStartTime = R.pathOr('', [briefImgIndex + 1, 'startTime'], briefingConfig);
        if (Math.round(processValue * duration * 0.01) - 1 ===
            moment.duration(nextStartTime).asMinutes()) {
            setBriefImgIndex(briefImgIndex + 1);
        }
    };
    // we need to use "useMemo" here, so we don't create new video elment on any render
    var videoElement = React.useMemo(function () {
        var element = document.createElement('video');
        element.src = src;
        element.setAttribute('playsinline', '');
        return element;
    }, [src]);
    // Video put in konva
    useEffect(function () {
        var layer = imageRef.current.getLayer();
        container.current.addEventListener('mouseover', over);
        container.current.addEventListener('mouseout', out);
        var anim = new Konva.Animation(function () { }, layer);
        anim.start();
        return function () {
            // container.current.removeEventListener('mouseover', over);
            // container.current.removeEventListener('mouseout', out);
            anim.stop();
        };
    });
    useEffect(function () {
        var maxWidth = 900;
        var maxHeight = 506.25;
        setSize({
            width: test.width > maxWidth ? maxWidth : test.width * 0.6,
            height: test.width > maxWidth ? maxHeight : test.width * 0.35,
        });
    }, [test]);
    useEffect(function () {
        if (videoElement) {
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                hls.loadSource(src);
            });
        }
        return function () {
            if (hls) {
                hls.destroy();
            }
            setHls(new Hls());
        };
    }, []);
    // when video is loaded, we should read it size
    useEffect(function () {
        var onload = function () {
            setDuration(videoElement.duration);
        };
        videoElement.addEventListener('loadedmetadata', onload);
        return function () {
            videoElement.removeEventListener('loadedmetadata', onload);
        };
    }, [videoElement]);
    var togglePlay = function (e) {
        pulseShape(playButton.current);
        pulseShape(playCircle.current);
        // prevent click on stage
        e.cancelBubble = true;
        videoElement.play();
    };
    var toggleReplay = function (e) {
        pulseShape(playButton.current);
        pulseShape(playCircle.current);
        // prevent click on stage
        e.cancelBubble = true;
        videoElement.currentTime = 0;
        videoElement.play();
    };
    var update = function (e) {
        var currentTime = e.target.currentTime;
        var duration = e.target.duration;
        var time = (currentTime / duration) * 100;
        setProcessValue(time);
    };
    var over = function () {
        setShowControlPanel(true);
    };
    var out = function () {
        setShowControlPanel(false);
    };
    useEffect(function () {
        videoElement.addEventListener('timeupdate', update);
        window.addEventListener('orientationchange', function () {
            // Announce the new orientation number
            alert(window.orientation);
        }, false);
        return function () {
            //   videoEl.current.removeEventListener('timeupdate', update);
        };
    }, []);
    var toggleStop = function (e) {
        videoElement.pause();
    };
    var timeChanges = function (time) {
        var dateTime = new moment(time * 1000);
        return dateTime.format('mm:ss');
    };
    var pulseShape = function (shape) {
        // use Konva methods to animate a shape
        shape.to({
            scaleX: 1.5,
            scaleY: 1.5,
            onFinish: function () {
                shape.to({
                    scaleX: 1,
                    scaleY: 1,
                });
            },
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Stage, { width: size.width, height: size.height },
            React.createElement(Layer, { ref: container },
                React.createElement(BriefingImg, { width: size.width, height: size.height, data: briefingConfig[briefImgIndex] }),
                React.createElement(Image, { draggable: true, ref: imageRef, image: videoElement, x: 0, y: 0, stroke: "red", width: size.width / 5, height: size.height / 5, onClick: toggleStop }),
                React.createElement(Group, { x: size.width / 2, y: size.height / 2, width: 50, visible: videoElement.paused, onClick: togglePlay },
                    React.createElement(Circle, { ref: playCircle, radius: 25, fill: "black", shadowBlur: 10, opacity: 0.4 }),
                    React.createElement(Shape, { ref: playButton, sceneFunc: function (context, shape) {
                            context.beginPath();
                            context.moveTo(-7, -12);
                            context.lineTo(-7, 12);
                            context.lineTo(12, 1);
                            context.closePath();
                            context.fillStrokeShape(shape);
                        }, fill: "white" })),
                React.createElement(Commercial, { config: CMConfig, size: size, currentTime: processValue * duration * 0.01 }),
                React.createElement(QAComponent, { size: size, config: QAConfig, currentTime: processValue * duration * 0.01, type: 2 }),
                React.createElement(Rect, { width: 200, height: 60, fill: "yellow", shadowBlur: 10, visible: isShowControlPanel, y: size.height - 60 }))),
        "\u6642\u9593: ",
        timeChanges(processValue * duration * 0.01),
        " /",
        timeChanges(duration),
        React.createElement("br", null),
        React.createElement("button", { onClick: toggleStop }, "Stop"),
        React.createElement("button", { onClick: togglePlay }, "play"),
        React.createElement("button", { onClick: toggleReplay }, "replay"),
        React.createElement("br", null),
        React.createElement("button", { onClick: function () {
                setSize({
                    width: test.width,
                    height: (videoElement.videoHeight * test.width) / videoElement.videoWidth,
                });
            } }, "Full screen"),
        React.createElement("button", { onClick: function () {
                setSize({
                    width: test.width * 0.6,
                    height: test.width * 0.35,
                });
            } }, "Origin screen")));
};

var VideoPlayer = function (_a) {
    var src = _a.src, config = _a.config;
    return (React.createElement("div", { className: styles.container },
        React.createElement(Video, { src: src, config: config })));
};
var VideoPlayerWithPic = function (_a) {
    var src = _a.src, config = _a.config;
    return (React.createElement("div", { className: styles.container },
        React.createElement(VideoWithPic, { src: src, config: config })));
};

export { VideoPlayer, VideoPlayerWithPic };
