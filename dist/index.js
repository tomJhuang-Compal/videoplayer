'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactKonva = require('react-konva');
var Konva = require('konva');
var moment = require('moment');
var Hls = require('hls.js');
var R = require('ramda');
var useImage = require('use-image');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Konva__default = /*#__PURE__*/_interopDefaultLegacy(Konva);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var Hls__default = /*#__PURE__*/_interopDefaultLegacy(Hls);
var R__namespace = /*#__PURE__*/_interopNamespace(R);
var useImage__default = /*#__PURE__*/_interopDefaultLegacy(useImage);

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
    var _a = React.useState(getWindowDimensions()), windowDimensions = _a[0], setWindowDimensions = _a[1];
    React.useEffect(function () {
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
    var image = useImage__default['default'](url)[0];
    return React__default['default'].createElement(reactKonva.Image, { image: image, x: x, y: y, width: width, height: height, onClick: onClick });
};
var Commercial = function (_a) {
    var size = _a.size, currentTime = _a.currentTime, config = _a.config;
    React.useRef(null);
    var _b = React.useState(''), CMLocation = _b[0], setCMLocation = _b[1];
    var _c = React.useState(config), CMData = _c[0]; _c[1];
    var _d = React.useState(0); _d[0]; _d[1];
    var _e = React.useState(config); _e[0]; _e[1];
    var _f = React.useState(''), CMImgSrc = _f[0], setCMImgSrc = _f[1];
    var _g = React.useState(''); _g[0]; _g[1];
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
        var x = R__namespace.pathOr(0, [CMLocation, 'x'], setting);
        var y = R__namespace.pathOr(0, [CMLocation, 'y'], setting);
        var width = R__namespace.pathOr(0, [CMLocation, 'width'], setting);
        var height = R__namespace.pathOr(0, [CMLocation, 'height'], setting);
        var image = CMImgSrc;
        return (React__default['default'].createElement(React__default['default'].Fragment, null,
            React__default['default'].createElement(ImageBlock, { url: image, x: x, y: y, width: width, height: height, onClick: function () {
                    window.open('https://shopping.pchome.com.tw/', '_blank');
                } }),
            React__default['default'].createElement(reactKonva.Rect, { x: x + width - width / 10, y: y, width: width / 10, height: height / 10, fill: "rgba(255,255,255,0.3)", onClick: function () { } }),
            React__default['default'].createElement(reactKonva.Line, { points: [x + width - 10, y, x + width, y + 10], stroke: 'red', strokeWidth: 2, lineCap: 'round', lineJoin: 'round', onClick: function () { } }),
            React__default['default'].createElement(reactKonva.Line, { points: [x + width, y, x + width - 10, y + 10], stroke: 'red', strokeWidth: 2, lineCap: 'round', lineJoin: 'round', onClick: function () { } })));
    };
    var changeTime = function (data) {
        return data.map(function (item) {
            var start = moment__default['default'].duration(item.start).asMinutes();
            var end = moment__default['default'].duration(item.end).asMinutes();
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
                if (currentTime >= R__namespace.pathOr(0, [i, 'start'], data) &&
                    currentTime <= R__namespace.pathOr(0, [i, 'end'], data)) {
                    return [R__namespace.pathOr('', [i, 'location'], data), i, R__namespace.pathOr('', [i, 'imgSrc'], data)];
                }
            }
        };
        var result = checkIsInTime();
        setCMLocation(R__namespace.pathOr('', [0], result));
        setCMImgSrc(R__namespace.pathOr('', [2], result));
    };
    React.useEffect(function () {
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
    var titleHeight = R__namespace.pathOr(titleConfig.fontSize + optionConfig.blankFromTitle, ['title', 'fontSize'], setting);
    var titleOffsetY = R__namespace.pathOr(0, ['title', 'offsetY'], setting);
    var optionFontSize = R__namespace.pathOr(optionConfig.fontSize, ['options', 'fontSize'], setting);
    var optionOffsetX = R__namespace.pathOr(optionConfig.x, ['options', 'offsetX'], setting);
    var optionOffsetY = R__namespace.pathOr(optionConfig.y, ['options', 'offsetY'], setting);
    var fontColor = R__namespace.pathOr('blue', ['options', 'color'], setting);
    var selectColor = R__namespace.pathOr('blue', ['options', 'selectColor'], setting);
    var rightColor = R__namespace.pathOr('blue', ['options', 'rightColor'], setting);
    var wrongColor = R__namespace.pathOr('red', ['options', 'wrongColor'], setting);
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
    return (React__default['default'].createElement(reactKonva.Group, { x: optionOffsetX, y: titleHeight + titleOffsetY + optionOffsetY, width: 300, height: 100 },
        React__default['default'].createElement(reactKonva.Circle, { x: 6, y: index * optionFontSize + optionFontSize / 2, radius: 6, fill: renderOptionColor(), onClick: function () {
                answerState !== ansState.UnAnswer ? {} : onClickOption(index);
            } }),
        React__default['default'].createElement(reactKonva.Text, { text: content.answer, fontSize: optionFontSize, fill: renderOptionColor(), x: 18, y: index * optionFontSize })));
};

var QAComponent = function (_a) {
    var size = _a.size, config = _a.config, currentTime = _a.currentTime, type = _a.type;
    var data = config;
    var _b = React.useState(false), isShowQuestion = _b[0], setIsShowQuestion = _b[1];
    var _c = React.useState(0), closeQuestionTime = _c[0], setCloseQuestionTime = _c[1];
    var _d = React.useState([]), ansContent = _d[0], setAnsContent = _d[1];
    var _e = React.useState(undefined), selectAns = _e[0], setSelectAns = _e[1];
    var _f = React.useState(ansState.UnAnswer), answerState = _f[0], setAnswerState = _f[1];
    var _g = React.useState(0), countTime = _g[0], setCountTime = _g[1];
    var _h = React.useState({}), questionSetting = _h[0], setQuestingSetting = _h[1];
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
            var startTime = R__namespace.pathOr('', [i, 'start'], data);
            var keepTime = R__namespace.pathOr(0, [i, 'keep'], data);
            if (Math.round(currentTime) === moment__default['default'].duration(startTime).asMinutes()) {
                setIsShowQuestion(true);
                setCloseQuestionTime(Math.round(currentTime) + keepTime + 1);
                setAnsContent(R__namespace.pathOr([], [i, 'options', 'content'], data));
                setCountTime(keepTime);
                setQuestingSetting(R__namespace.pathOr({}, [i], data));
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
    React.useEffect(function () {
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
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(reactKonva.Group, { draggable: true, x: x, y: y, width: width, height: height, visible: isShowQuestion },
            React__default['default'].createElement(reactKonva.Rect, { width: width, height: height, fill: R__namespace.pathOr(windowConfig.backgroundColor, ['window', 'backgroundColor'], questionSetting), shadowBlur: 10, cornerRadius: R__namespace.pathOr(windowConfig.cornerRadius, ['window', 'cornerRadius'], questionSetting) }),
            React__default['default'].createElement(reactKonva.Text, { text: R__namespace.pathOr('', ['title', 'question'], questionSetting), fontSize: R__namespace.pathOr(titleDefaultConfig.fontSize, ['title', 'fontSize'], questionSetting), fill: R__namespace.pathOr(titleDefaultConfig.color, ['title', 'color'], questionSetting), x: R__namespace.pathOr(titleDefaultConfig.x, ['title', 'offsetX'], questionSetting), y: R__namespace.pathOr(titleDefaultConfig.y, ['title', 'offsetY'], questionSetting) }),
            ansContent.map(function (item, index) { return (React__default['default'].createElement(RenderAnsContent, { content: item, index: index, selectAns: selectAns, onClickOption: setSelectAns, answerState: answerState, setting: questionSetting })); }),
            React__default['default'].createElement(reactKonva.Group, { x: width - R__namespace.pathOr(closeCrossConfig.x, ['closeCross', 'offsetX'], questionSetting), y: 4, onClick: function () {
                    setIsShowQuestion(false);
                }, width: R__namespace.pathOr(closeCrossConfig.width, ['closeCross', 'width'], questionSetting), height: R__namespace.pathOr(closeCrossConfig.width, ['closeCross', 'height'], questionSetting) },
                React__default['default'].createElement(reactKonva.Line, { points: [
                        0,
                        0,
                        R__namespace.pathOr(closeCrossConfig.width, ['closeCross', 'width'], questionSetting),
                        R__namespace.pathOr(closeCrossConfig.width, ['closeCross', 'height'], questionSetting),
                    ], stroke: R__namespace.pathOr(closeCrossConfig.color, ['closeCross', 'color'], questionSetting), strokeWidth: R__namespace.pathOr(closeCrossConfig.strokeWidth, ['closeCross', 'strokeWidth'], questionSetting), lineCap: 'round', lineJoin: 'round', onClick: function () {
                        setIsShowQuestion(false);
                    } }),
                React__default['default'].createElement(reactKonva.Line, { points: [
                        0,
                        R__namespace.pathOr(closeCrossConfig.width, ['closeCross', 'height'], questionSetting),
                        R__namespace.pathOr(closeCrossConfig.width, ['closeCross', 'width'], questionSetting),
                        0,
                    ], stroke: R__namespace.pathOr(closeCrossConfig.color, ['closeCross', 'color'], questionSetting), strokeWidth: R__namespace.pathOr(closeCrossConfig.strokeWidth, ['closeCross', 'strokeWidth'], questionSetting), lineCap: 'round', lineJoin: 'round', onClick: function () {
                        setIsShowQuestion(false);
                    } })),
            React__default['default'].createElement(reactKonva.Group, { x: width - 70, y: height - 40, onClick: function () {
                    checkAnswer();
                } },
                React__default['default'].createElement(reactKonva.Rect, { width: 50, height: 25, fill: "blue", shadowBlur: 6 }),
                React__default['default'].createElement(reactKonva.Text, { text: '確定', fontSize: 15, fill: 'white', x: 10, y: 5 })),
            React__default['default'].createElement(reactKonva.Text, { x: width - 130, y: height / 2 + 10, text: ansStateText[answerState], fontSize: 15, fill: 'black', visible: answerState !== ansState.UnAnswer }),
            React__default['default'].createElement(reactKonva.Text, { x: width - 130, y: height / 2 - 20, text: tick(), fontSize: 15, fill: 'black' }))));
};

//@ts-nocheck
var Video = function (props) {
    var src = props.src, config = props.config;
    var imageRef = React.useRef(null);
    React.useRef(null);
    var CMConfig = R__namespace.pathOr([], ['CM'], config);
    var QAConfig = R__namespace.pathOr([], ['Q&A'], config);
    var test = useWindowDimensions();
    var _a = React.useState(0), processValue = _a[0], setProcessValue = _a[1];
    var _b = React.useState(false), isShowControlPanel = _b[0], setShowControlPanel = _b[1];
    var _c = React.useState(0), duration = _c[0], setDuration = _c[1];
    var _d = React.useState({
        width: test.width * 0.6,
        height: test.width * 0.35,
    }), size = _d[0], setSize = _d[1];
    var _e = React.useState(new Hls__default['default']()), hls = _e[0], setHls = _e[1];
    var _f = React.useState(true); _f[0]; _f[1];
    var playButton = React.useRef(null);
    var playCircle = React.useRef(null);
    var container = React.useRef(null);
    // we need to use "useMemo" here, so we don't create new video elment on any render
    var videoElement = React__default['default'].useMemo(function () {
        var element = document.createElement('video');
        element.src = src;
        element.setAttribute('playsinline', '');
        element.setAttribute('autoplay', '');
        element.setAttribute('loop', '');
        return element;
    }, [src]);
    // Video put in konva
    React.useEffect(function () {
        var layer = imageRef.current.getLayer();
        container.current.addEventListener('mouseover', over);
        container.current.addEventListener('mouseout', out);
        var anim = new Konva__default['default'].Animation(function () { }, layer);
        anim.start();
        return function () {
            // container.current.removeEventListener('mouseover', over);
            // container.current.removeEventListener('mouseout', out);
            anim.stop();
        };
    });
    React.useEffect(function () {
        var maxWidth = 900;
        var maxHeight = 506.25;
        setSize({
            width: test.width > maxWidth ? maxWidth : test.width * 0.6,
            height: test.width > maxWidth ? maxHeight : test.width * 0.35,
        });
    }, [test]);
    React.useEffect(function () {
        if (videoElement) {
            hls.attachMedia(videoElement);
            hls.on(Hls__default['default'].Events.MEDIA_ATTACHED, function () {
                hls.loadSource(src);
            });
        }
        return function () {
            if (hls) {
                hls.destroy();
            }
            setHls(new Hls__default['default']());
        };
    }, []);
    // when video is loaded, we should read it size
    React.useEffect(function () {
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
    React.useEffect(function () {
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
        var dateTime = new moment__default['default'](time * 1000);
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
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(reactKonva.Stage, { width: size.width, height: size.height },
            React__default['default'].createElement(reactKonva.Layer, { ref: container },
                React__default['default'].createElement(reactKonva.Image, { ref: imageRef, image: videoElement, x: 0, y: 0, stroke: "red", width: size.width, height: size.height, onClick: toggleStop }),
                React__default['default'].createElement(reactKonva.Group, { x: size.width / 2, y: size.height / 2, width: 50, visible: videoElement.paused, onClick: togglePlay },
                    React__default['default'].createElement(reactKonva.Circle, { ref: playCircle, radius: 25, fill: "black", shadowBlur: 10, opacity: 0.4 }),
                    React__default['default'].createElement(reactKonva.Shape, { ref: playButton, sceneFunc: function (context, shape) {
                            context.beginPath();
                            context.moveTo(-7, -12);
                            context.lineTo(-7, 12);
                            context.lineTo(12, 1);
                            context.closePath();
                            context.fillStrokeShape(shape);
                        }, fill: "white" })),
                React__default['default'].createElement(Commercial, { config: CMConfig, size: size, currentTime: processValue * duration * 0.01 }),
                React__default['default'].createElement(QAComponent, { size: size, config: QAConfig, currentTime: processValue * duration * 0.01, type: 2 }),
                React__default['default'].createElement(reactKonva.Rect, { width: 200, height: 60, fill: "yellow", shadowBlur: 10, visible: isShowControlPanel, y: size.height - 60 }))),
        "\u6642\u9593: ",
        timeChanges(processValue * duration * 0.01),
        " /",
        timeChanges(duration),
        React__default['default'].createElement("br", null),
        React__default['default'].createElement("button", { onClick: toggleStop }, "Stop"),
        React__default['default'].createElement("button", { onClick: togglePlay }, "play"),
        React__default['default'].createElement("button", { onClick: toggleReplay }, "replay"),
        React__default['default'].createElement("br", null),
        React__default['default'].createElement("button", { onClick: function () {
                setSize({
                    width: test.width,
                    height: (videoElement.videoHeight * test.width) / videoElement.videoWidth,
                });
            } }, "Full screen"),
        React__default['default'].createElement("button", { onClick: function () {
                setSize({
                    width: test.width * 0.6,
                    height: test.width * 0.35,
                });
            } }, "Origin screen")));
};

//@ts-nocheck
var BriefingImg = function (_a) {
    var data = _a.data, width = _a.width, height = _a.height;
    var image = useImage__default['default'](R__namespace.pathOr('', ['src'], data))[0];
    return React__default['default'].createElement(reactKonva.Image, { width: width, height: height, image: image });
};
var VideoWithPic = function (props) {
    var src = props.src, config = props.config;
    var imageRef = React.useRef(null);
    React.useRef(null);
    var CMConfig = R__namespace.pathOr([], ['CM'], config);
    var QAConfig = R__namespace.pathOr([], ['Q&A'], config);
    var briefingConfig = R__namespace.pathOr([], ['briefing'], config);
    var test = useWindowDimensions();
    var _a = React.useState(0), processValue = _a[0], setProcessValue = _a[1];
    var _b = React.useState(false), isShowControlPanel = _b[0], setShowControlPanel = _b[1];
    var _c = React.useState(0), duration = _c[0], setDuration = _c[1];
    var _d = React.useState({
        width: test.width * 0.6,
        height: test.width * 0.35,
    }), size = _d[0], setSize = _d[1];
    var _e = React.useState(new Hls__default['default']()), hls = _e[0], setHls = _e[1];
    var _f = React.useState(true); _f[0]; _f[1];
    var playButton = React.useRef(null);
    var playCircle = React.useRef(null);
    var container = React.useRef(null);
    var _g = React.useState(0), briefImgIndex = _g[0], setBriefImgIndex = _g[1];
    React.useEffect(function () {
        checkBriefingTime();
    });
    var checkBriefingTime = function () {
        var nextStartTime = R__namespace.pathOr('', [briefImgIndex + 1, 'startTime'], briefingConfig);
        if (Math.round(processValue * duration * 0.01) - 1 ===
            moment__default['default'].duration(nextStartTime).asMinutes()) {
            setBriefImgIndex(briefImgIndex + 1);
        }
    };
    // we need to use "useMemo" here, so we don't create new video elment on any render
    var videoElement = React__default['default'].useMemo(function () {
        var element = document.createElement('video');
        element.src = src;
        element.setAttribute('playsinline', '');
        return element;
    }, [src]);
    // Video put in konva
    React.useEffect(function () {
        var layer = imageRef.current.getLayer();
        container.current.addEventListener('mouseover', over);
        container.current.addEventListener('mouseout', out);
        var anim = new Konva__default['default'].Animation(function () { }, layer);
        anim.start();
        return function () {
            // container.current.removeEventListener('mouseover', over);
            // container.current.removeEventListener('mouseout', out);
            anim.stop();
        };
    });
    React.useEffect(function () {
        var maxWidth = 900;
        var maxHeight = 506.25;
        setSize({
            width: test.width > maxWidth ? maxWidth : test.width * 0.6,
            height: test.width > maxWidth ? maxHeight : test.width * 0.35,
        });
    }, [test]);
    React.useEffect(function () {
        if (videoElement) {
            hls.attachMedia(videoElement);
            hls.on(Hls__default['default'].Events.MEDIA_ATTACHED, function () {
                hls.loadSource(src);
            });
        }
        return function () {
            if (hls) {
                hls.destroy();
            }
            setHls(new Hls__default['default']());
        };
    }, []);
    // when video is loaded, we should read it size
    React.useEffect(function () {
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
    React.useEffect(function () {
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
        var dateTime = new moment__default['default'](time * 1000);
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
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(reactKonva.Stage, { width: size.width, height: size.height },
            React__default['default'].createElement(reactKonva.Layer, { ref: container },
                React__default['default'].createElement(BriefingImg, { width: size.width, height: size.height, data: briefingConfig[briefImgIndex] }),
                React__default['default'].createElement(reactKonva.Image, { draggable: true, ref: imageRef, image: videoElement, x: 0, y: 0, stroke: "red", width: size.width / 5, height: size.height / 5, onClick: toggleStop }),
                React__default['default'].createElement(reactKonva.Group, { x: size.width / 2, y: size.height / 2, width: 50, visible: videoElement.paused, onClick: togglePlay },
                    React__default['default'].createElement(reactKonva.Circle, { ref: playCircle, radius: 25, fill: "black", shadowBlur: 10, opacity: 0.4 }),
                    React__default['default'].createElement(reactKonva.Shape, { ref: playButton, sceneFunc: function (context, shape) {
                            context.beginPath();
                            context.moveTo(-7, -12);
                            context.lineTo(-7, 12);
                            context.lineTo(12, 1);
                            context.closePath();
                            context.fillStrokeShape(shape);
                        }, fill: "white" })),
                React__default['default'].createElement(Commercial, { config: CMConfig, size: size, currentTime: processValue * duration * 0.01 }),
                React__default['default'].createElement(QAComponent, { size: size, config: QAConfig, currentTime: processValue * duration * 0.01, type: 2 }),
                React__default['default'].createElement(reactKonva.Rect, { width: 200, height: 60, fill: "yellow", shadowBlur: 10, visible: isShowControlPanel, y: size.height - 60 }))),
        "\u6642\u9593: ",
        timeChanges(processValue * duration * 0.01),
        " /",
        timeChanges(duration),
        React__default['default'].createElement("br", null),
        React__default['default'].createElement("button", { onClick: toggleStop }, "Stop"),
        React__default['default'].createElement("button", { onClick: togglePlay }, "play"),
        React__default['default'].createElement("button", { onClick: toggleReplay }, "replay"),
        React__default['default'].createElement("br", null),
        React__default['default'].createElement("button", { onClick: function () {
                setSize({
                    width: test.width,
                    height: (videoElement.videoHeight * test.width) / videoElement.videoWidth,
                });
            } }, "Full screen"),
        React__default['default'].createElement("button", { onClick: function () {
                setSize({
                    width: test.width * 0.6,
                    height: test.width * 0.35,
                });
            } }, "Origin screen")));
};

var VideoPlayer = function (_a) {
    var src = _a.src, config = _a.config;
    return (React__default['default'].createElement("div", { className: styles.container },
        React__default['default'].createElement(Video, { src: src, config: config })));
};
var VideoPlayerWithPic = function (_a) {
    var src = _a.src, config = _a.config;
    return (React__default['default'].createElement("div", { className: styles.container },
        React__default['default'].createElement(VideoWithPic, { src: src, config: config })));
};

exports.VideoPlayer = VideoPlayer;
exports.VideoPlayerWithPic = VideoPlayerWithPic;
