'use strict';

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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

//@ts-nocheck
var secondToTime = function (x) {
    var sec_num = parseInt(x, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
};

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

var CMSetting = [
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
var ImageBlock = function (props) {
    var url = props.url, x = props.x, y = props.y, width = props.width, height = props.height, onClick = props.onClick;
    var image = useImage__default['default'](url)[0];
    return React__default['default'].createElement(reactKonva.Image, { image: image, x: x, y: y, width: width, height: height, onClick: onClick });
};
var Video = function (props) {
    var src = props.src;
    var test = useWindowDimensions();
    var imageRef = React.useRef(null);
    var _a = React.useState(0), processValue = _a[0], setProcessValue = _a[1];
    var _b = React.useState(0), duration = _b[0], setDuration = _b[1];
    var _c = React.useState({
        width: test.width * 0.6,
        height: test.width * 0.35,
    }), size = _c[0], setSize = _c[1];
    var _d = React.useState(new Hls__default['default']()), hls = _d[0], setHls = _d[1];
    var _e = React.useState(''), isShowRect = _e[0], setIsShowRect = _e[1];
    var _f = React.useState(''), CMLocation = _f[0], setCMLocation = _f[1];
    var _g = React.useState(CMSetting), CMData = _g[0], setCMData = _g[1];
    var _h = React.useState(0), CMIndex = _h[0], setCMIndex = _h[1];
    var _j = React.useState(CMSetting), inputData = _j[0], setInputData = _j[1];
    var _k = React.useState(''), CMImgSrc = _k[0], setCMImgSrc = _k[1];
    // we need to use "useMemo" here, so we don't create new video elment on any render
    var videoElement = React__default['default'].useMemo(function () {
        var element = document.createElement('video');
        element.src = src;
        element.setAttribute('playsinline', '');
        return element;
    }, [src]);
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
    React.useEffect(function () {
        setSize({
            width: test.width * 0.6,
            height: test.width * 0.35,
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
    // use Konva.Animation to redraw a layer
    React.useEffect(function () {
        videoElement.play();
        var layer = imageRef.current.getLayer();
        var anim = new Konva__default['default'].Animation(function () { }, layer);
        anim.start();
        return function () { return anim.stop(); };
    }, [videoElement]);
    var togglePlay = function (e) {
        videoElement.play();
    };
    var update = function (e) {
        var currentTime = e.target.currentTime;
        var duration = e.target.duration;
        var time = (currentTime / duration) * 100;
        setProcessValue(time);
        if (!isShowRect) {
            renderCM(secondToTime(time * duration * 0.01));
        }
    };
    React.useEffect(function () {
        videoElement.addEventListener('timeupdate', update);
        window.addEventListener('orientationchange', function () {
            // Announce the new orientation number
            alert(window.orientation);
        }, false);
        return function () {
            // videoEl.current.removeEventListener("timeupdate", update);
        };
    }, []);
    var toggleStop = function (e) {
        videoElement.pause();
    };
    var timeChanges = function (time) {
        var dateTime = new moment__default['default'](time * 1000);
        return dateTime.format('mm:ss');
    };
    var changeTime = function (data) {
        return data.map(function (item) {
            var start = moment__default['default'].duration(item.start).asMinutes();
            var end = moment__default['default'].duration(item.end).asMinutes();
            var location = item.location;
            var isSkip = item.isSkip;
            var imgSrc = item.imgSrc;
            return {
                start: start,
                end: end,
                location: location,
                isSkip: isSkip,
                imgSrc: imgSrc,
            };
        });
    };
    var clseCM = function () {
        var currentCM = R__namespace.pathOr([], [CMIndex], CMData);
        var res = CMData.map(function (obj, index) {
            if (index === CMIndex) {
                return __assign(__assign({}, currentCM), { isSkip: true });
            }
            else
                return obj;
        });
        setCMData(res);
    };
    var renderRect = function (isShow) {
        if (isShowRect) {
            var x = R__namespace.pathOr(0, [CMLocation, 'x'], setting);
            var y = R__namespace.pathOr(0, [CMLocation, 'y'], setting);
            var width = R__namespace.pathOr(0, [CMLocation, 'width'], setting);
            var height = R__namespace.pathOr(0, [CMLocation, 'height'], setting);
            var image = CMImgSrc;
            return (React__default['default'].createElement(React__default['default'].Fragment, null,
                React__default['default'].createElement(ImageBlock, { url: image, x: x, y: y, width: width, height: height, onClick: function () {
                        window.open('https://shopping.pchome.com.tw/', '_blank');
                    } }),
                React__default['default'].createElement(reactKonva.Rect, { x: x + width - width / 10, y: y, width: width / 10, height: height / 10, fill: "rgba(255,255,255,0.3)", onClick: function () {
                        clseCM();
                    } }),
                React__default['default'].createElement(reactKonva.Line, { points: [x + width - 10, y, x + width, y + 10], stroke: 'red', strokeWidth: 2, lineCap: 'round', lineJoin: 'round', onClick: function () {
                        clseCM();
                    } }),
                React__default['default'].createElement(reactKonva.Line, { points: [x + width, y, x + width - 10, y + 10], stroke: 'red', strokeWidth: 2, lineCap: 'round', lineJoin: 'round', onClick: function () {
                        clseCM();
                    } })));
        }
        return null;
    };
    var renderCM = function (time) {
        var currentTime = moment__default['default'].duration(time).asMinutes();
        var data = changeTime(CMData);
        var checkIsInTime = function () {
            for (var i = 0; i < data.length; i++) {
                // const isShow = inRange(currentTime, data[i].start, data[i].end);
                var isSkip = R__namespace.pathOr(false, [i, 'isSkip'], data);
                if (isSkip) {
                    return null;
                }
                else if (currentTime >= R__namespace.pathOr(0, [i, 'start'], data) &&
                    currentTime <= R__namespace.pathOr(0, [i, 'end'], data)) {
                    return [
                        R__namespace.pathOr('', [i, 'location'], data),
                        i,
                        isSkip,
                        R__namespace.pathOr('', [i, 'imgSrc'], data),
                    ];
                }
            }
        };
        var isHaveLocation = checkIsInTime();
        if (isHaveLocation) {
            setCMLocation(isHaveLocation[0]);
            setCMIndex(isHaveLocation[1]);
            setCMImgSrc(isHaveLocation[3]);
            setIsShowRect(true);
        }
        else {
            setCMLocation('');
            setIsShowRect(false);
            setCMIndex(0);
            setCMImgSrc('');
        }
    };
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(reactKonva.Stage, { width: size.width, height: size.height },
            React__default['default'].createElement(reactKonva.Layer, null,
                React__default['default'].createElement(reactKonva.Image, { ref: imageRef, image: videoElement, x: 0, y: 0, stroke: "red", width: size.width, height: size.height }),
                renderRect())),
        "\u6642\u9593: ",
        timeChanges(processValue * duration * 0.01),
        " /",
        timeChanges(duration),
        React__default['default'].createElement("br", null),
        React__default['default'].createElement("button", { onClick: toggleStop }, "Stop"),
        React__default['default'].createElement("button", { onClick: togglePlay }, "play"),
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
            } }, "Origin screen"),
        React__default['default'].createElement("textarea", { style: { width: 400, height: 200 }, value: JSON.stringify(inputData, undefined, 2), onChange: function (e) {
                var inputValue = e.target.value;
                setInputData(JSON.parse(inputValue));
            } })));
};
var Counter = function (_a) {
    var src = _a.src;
    return (React__default['default'].createElement("div", { className: styles.container },
        React__default['default'].createElement(Video, { src: src })));
};

module.exports = Counter;
