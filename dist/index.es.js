import React, { useState, useEffect, useRef } from 'react';
import { Rect, Line, Image, Stage, Layer } from 'react-konva';
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

//@ts-nocheck
var Video = function (props) {
    var src = props.src, config = props.config;
    var imageRef = useRef(null);
    var CMConfig = R.pathOr([], ['CM'], config);
    var test = useWindowDimensions();
    var _a = useState(0), processValue = _a[0], setProcessValue = _a[1];
    var _b = useState(0), duration = _b[0], setDuration = _b[1];
    var _c = useState({
        width: test.width * 0.6,
        height: test.width * 0.35,
    }), size = _c[0], setSize = _c[1];
    var _d = useState(new Hls()), hls = _d[0], setHls = _d[1];
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
        var anim = new Konva.Animation(function () { }, layer);
        anim.start();
        return function () { return anim.stop(); };
    });
    useEffect(function () {
        setSize({
            width: test.width * 0.6,
            height: test.width * 0.35,
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
        videoElement.play();
    };
    var update = function (e) {
        var currentTime = e.target.currentTime;
        var duration = e.target.duration;
        var time = (currentTime / duration) * 100;
        setProcessValue(time);
    };
    useEffect(function () {
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
        var dateTime = new moment(time * 1000);
        return dateTime.format('mm:ss');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Stage, { width: size.width, height: size.height },
            React.createElement(Layer, null,
                React.createElement(Image, { ref: imageRef, image: videoElement, x: 0, y: 0, stroke: "red", width: size.width, height: size.height }),
                React.createElement(Commercial, { config: CMConfig, size: size, currentTime: processValue * duration * 0.01 }))),
        "\u6642\u9593: ",
        timeChanges(processValue * duration * 0.01),
        " /",
        timeChanges(duration),
        React.createElement("br", null),
        React.createElement("button", { onClick: toggleStop }, "Stop"),
        React.createElement("button", { onClick: togglePlay }, "play"),
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

var Counter = function (_a) {
    var src = _a.src, config = _a.config;
    return (React.createElement("div", { className: styles.container },
        React.createElement(Video, { src: src, config: config })));
};

export default Counter;
