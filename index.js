"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  z-index: 1;\n  color: transparent;\n  opacity: 0;\n\n  &:focus {\n    outline: none;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border: 0;\n  border-bottom: solid 2px #e6e8ec;\n  border-color: ", ";\n  background-color: transparent;\n  width: 32px;\n  margin: 0px 4px;\n  text-align: center;\n  outline: none;\n  color: transparent;\n  text-shadow: 0 0 0 #000;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Flex = _styledComponents["default"].div(_templateObject());

var SingleOTPInput = _styledComponents["default"].input(_templateObject2(), function (props) {
  return props.active ? "#2b2b2b" : "#e6e8ec";
});

var ContentEditableBox = _styledComponents["default"].input.attrs({
  contentEditable: true,
  suppressContentEditableWarning: true,
  type: "tel"
})(_templateObject3());

var isNumber = function isNumber(_char) {
  return !isNaN(_char);
};

var OtpInput = function OtpInput(_ref) {
  var numberOfInputs = _ref.numberOfInputs,
      onChange = _ref.onChange,
      onComplete = _ref.onComplete,
      otp = _ref.otp,
      disabled = _ref.disabled;
  var otpValue = otp.padEnd(numberOfInputs);
  var inputs = Array(numberOfInputs).fill(0);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      activeIndex = _useState2[0],
      setActiveIndex = _useState2[1];

  var contentEditableBoxRef = (0, _react.useRef)(null);

  var handleKeyDown = function handleKeyDown(e) {
    if (e.keyCode === 8) {
      e.preventDefault();
      handleTextInput(new Event("backSpaceKey"));
    }
  };

  var handleTextInput = function handleTextInput(e) {
    e.preventDefault();
    var key = e.data || e.type; // Backspace, prevent set active when is on the first input

    if (key === "backSpaceKey" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      onChange(otp.slice(0, otp.length - 1));
    }

    if (isNumber(key)) {
      var newOtp = otp + key;
      setActiveIndex(activeIndex + 1);
      onChange(newOtp);

      if (newOtp.length === numberOfInputs) {
        onComplete(otp);
      }
    }
  };

  (0, _react.useEffect)(function () {
    // reset
    if (otp === "") {
      setActiveIndex(0);
      contentEditableBoxRef.current.focus();
    }
  }, [otp]);
  (0, _react.useEffect)(function () {
    var box = document.getElementById("contentEditableBox");

    if (!disabled) {
      box.addEventListener("keydown", handleKeyDown);
      box.addEventListener("textInput", handleTextInput);
    }

    return function () {
      box.removeEventListener("keydown", handleKeyDown);
      box.removeEventListener("textInput", handleTextInput);
    };
  }, [handleTextInput, disabled]);
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(ContentEditableBox, {
    id: "contentEditableBox",
    ref: contentEditableBoxRef
  }), _react["default"].createElement(Flex, null, inputs.map(function (v, i) {
    return _react["default"].createElement(SingleOTPInput, {
      key: i,
      id: "otp_".concat(i),
      value: otpValue[i],
      active: i === activeIndex
    });
  })));
};

var _default = OtpInput;
exports["default"] = _default;
