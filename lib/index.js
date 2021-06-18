"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactJss = require("react-jss");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStyles = (0, _reactJss.createUseStyles)({
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  singleOtpInput: {
    border: 0,
    borderBottom: "solid 2px #e6e8ec",
    borderRadius: 0,
    backgroundColor: "transparent",
    width: "32px",
    margin: "0px 4px",
    textAlign: "center",
    padding: "1px 2px",
    outline: "none",
    color: "transparent",
    textShadow: "0 0 0 #000",
    "&.active": {
      borderColor: "#2b2b2b"
    }
  },
  contentEditableBox: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    zIndex: 1,
    color: "transparent",
    opacity: 0,
    "&:focus": {
      outline: "none"
    }
  }
});

var isNumber = function isNumber(_char) {
  return !isNaN(_char);
};

var OtpInput = function OtpInput(_ref) {
  var numberOfInputs = _ref.numberOfInputs,
      onChange = _ref.onChange,
      onComplete = _ref.onComplete,
      otp = _ref.otp,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  var classes = useStyles();
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
      if (disabled) return;
      handleTextInput(new Event("backSpaceKey"));
    }
  };

  var handleTextInput = function handleTextInput(e) {
    e.preventDefault();
    var key = e.data || e.type;
    if (disabled) return; // Backspace, prevent set active when is on the first input

    if (key === "backSpaceKey" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      onChange(otp.slice(0, otp.length - 1));
    }

    if (isNumber(key)) {
      var newOtp = otp + key;
      setActiveIndex(activeIndex + 1);
      onChange(newOtp);

      if (newOtp.length === numberOfInputs) {
        onComplete(newOtp);
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
    box.addEventListener("keydown", handleKeyDown);
    box.addEventListener("textInput", handleTextInput);
    return function () {
      box.removeEventListener("keydown", handleKeyDown);
      box.removeEventListener("textInput", handleTextInput);
    };
  }, [handleTextInput]);
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("input", {
    className: classes.contentEditableBox,
    id: "contentEditableBox",
    ref: contentEditableBoxRef,
    contentEditable: true,
    suppressContentEditableWarning: true,
    type: "tel"
  }), _react["default"].createElement("div", {
    className: classes.inputWrapper,
    id: "inputWrapper",
    "data-testid": "inputWrapper"
  }, inputs.map(function (v, i) {
    return _react["default"].createElement("input", {
      key: i,
      id: "otp_".concat(i),
      value: otpValue[i],
      onChange: function onChange() {},
      active: i === activeIndex,
      className: [classes.singleOtpInput, otpValue[i].trim() ? "active" : i === activeIndex ? "focus" : ""].join(" ")
    });
  })));
};

var _default = OtpInput;
exports["default"] = _default;
