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

//@ts-nocheck
var Video = function (props) {
    var src = props.src, config = props.config;
    var imageRef = React.useRef(null);
    var CMConfig = R__namespace.pathOr([], ['CM'], config);
    var test = useWindowDimensions();
    var _a = React.useState(0), processValue = _a[0], setProcessValue = _a[1];
    var _b = React.useState(0), duration = _b[0], setDuration = _b[1];
    var _c = React.useState({
        width: test.width * 0.6,
        height: test.width * 0.35,
    }), size = _c[0], setSize = _c[1];
    var _d = React.useState(new Hls__default['default']()), hls = _d[0], setHls = _d[1];
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
        var anim = new Konva__default['default'].Animation(function () { }, layer);
        anim.start();
        return function () { return anim.stop(); };
    });
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
    var togglePlay = function (e) {
        videoElement.play();
    };
    var update = function (e) {
        var currentTime = e.target.currentTime;
        var duration = e.target.duration;
        var time = (currentTime / duration) * 100;
        setProcessValue(time);
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
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(reactKonva.Stage, { width: size.width, height: size.height },
            React__default['default'].createElement(reactKonva.Layer, null,
                React__default['default'].createElement(reactKonva.Image, { ref: imageRef, image: videoElement, x: 0, y: 0, stroke: "red", width: size.width, height: size.height }),
                React__default['default'].createElement(Commercial, { config: CMConfig, size: size, currentTime: processValue * duration * 0.01 }))),
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
            } }, "Origin screen")));
};

var Counter = function (_a) {
    var src = _a.src, config = _a.config;
    return (React__default['default'].createElement("div", { className: styles.container },
        React__default['default'].createElement(Video, { src: src, config: config })));
};

module.exports = Counter;
