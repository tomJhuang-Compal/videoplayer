'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

var Counter = function (_a) {
    var value = _a.value;
    var _b = React.useState(0), counter = _b[0], setCounter = _b[1];
    var setCounterUp = function () { return setCounter(counter + value); };
    return (React__default['default'].createElement("div", { className: styles.container },
        counter,
        React__default['default'].createElement("button", { onClick: setCounterUp, style: { marginLeft: 15 } },
            "Like +",
            value),
        React__default['default'].createElement("div", { className: styles.hiContainer }, "fxHI"),
        React__default['default'].createElement("div", { className: styles.erContainer }, "tesst"),
        React__default['default'].createElement("div", { className: styles.good }, "good"),
        React__default['default'].createElement("div", { className: styles.testXX }, "testXX"),
        React__default['default'].createElement("div", { className: styles.how }, "testXX"),
        React__default['default'].createElement("div", { className: styles.sdsff }, "ffdf")));
};

exports.Counter = Counter;
