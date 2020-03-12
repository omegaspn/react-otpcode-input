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
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled;
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
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(ContentEditableBox, {
    id: "contentEditableBox",
    ref: contentEditableBoxRef,
    disabled: disabled ? "disabled" : ""
  }), _react["default"].createElement(Flex, {
    id: "inputWrapper"
  }, inputs.map(function (v, i) {
    return _react["default"].createElement(SingleOTPInput, {
      key: i,
      id: "otp_".concat(i),
      value: otpValue[i],
      onChange: function onChange() {},
      active: i === activeIndex
    });
  })));
};

var _default = OtpInput;
exports["default"] = _default;
"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _testUtils = require("react-dom/test-utils");

var _ = _interopRequireDefault(require("."));

require("@testing-library/jest-dom/extend-expect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("OtpInput", function () {
  var container;
  var dom;
  var sendKey = null;
  var addEventMock = jest.fn(function (eventName, callback) {
    if (eventName === "textInput") {
      sendKey = callback;
    }
  });
  var removeEventMock = jest.fn(function (eventName, callback) {
    if (eventName === "textInput") {
      sendKey = null;
    }
  });

  var keyOtp =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(otp) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

      return regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 3;
              _loop =
              /*#__PURE__*/
              regeneratorRuntime.mark(function _loop() {
                var key;
                return regeneratorRuntime.wrap(function _loop$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        key = _step.value;
                        _context2.next = 3;
                        return (0, _testUtils.act)(
                        /*#__PURE__*/
                        _asyncToGenerator(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee() {
                          return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return sendKey({
                                    data: key,
                                    preventDefault: jest.fn()
                                  });

                                case 2:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        })));

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _loop);
              });
              _iterator = otp[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context3.next = 11;
                break;
              }

              return _context3.delegateYield(_loop(), "t0", 8);

            case 8:
              _iteratorNormalCompletion = true;
              _context3.next = 6;
              break;

            case 11:
              _context3.next = 17;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t1 = _context3["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context3.t1;

            case 17:
              _context3.prev = 17;
              _context3.prev = 18;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 20:
              _context3.prev = 20;

              if (!_didIteratorError) {
                _context3.next = 23;
                break;
              }

              throw _iteratorError;

            case 23:
              return _context3.finish(20);

            case 24:
              return _context3.finish(17);

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, null, [[3, 13, 17, 25], [18,, 20, 24]]);
    }));

    return function keyOtp(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var renderOtp = function renderOtp() {
    var numberOfInputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    return (0, _react2.render)(_react["default"].createElement(_["default"], {
      numberOfInputs: numberOfInputs,
      onChange: jest.fn(),
      onComplete: jest.fn(),
      otp: "",
      disabled: false
    }));
  };

  beforeEach(function () {
    // setup a DOM element as a render target
    container = document.createElement("div");
    container.setAttribute("id", "contentEditableBox");
    document.body.appendChild(container);
    container.addEventListener = addEventMock;
    container.removeEventListener = removeEventMock;
  });
  it("should renders correctly", function () {
    dom = renderOtp();
    expect(dom.asFragment()).toMatchSnapshot();
    expect(dom.container.querySelector("#contentEditableBox")).not.toHaveAttribute("disabled");
  });
  it("should renders Token inputs by given length", function () {
    dom = renderOtp(4);
    expect(dom.container.querySelectorAll("#inputWrapper input").length).toBe(4);
  });
  it("should display token correctly when user inputs",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var onChange;
    return regeneratorRuntime.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            onChange = jest.fn();
            dom = (0, _react2.render)(_react["default"].createElement(_["default"], {
              numberOfInputs: 6,
              onChange: onChange,
              onComplete: jest.fn(),
              otp: "",
              disabled: false
            }));
            _context4.next = 4;
            return keyOtp("123");

          case 4:
            expect(onChange).toHaveBeenCalledWith("1");
            expect(onChange).toHaveBeenCalledWith("2");
            expect(onChange).toHaveBeenCalledWith("3");

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3);
  })));
  it("should clear value user inputs backspace",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var onChange;
    return regeneratorRuntime.wrap(function _callee6$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            onChange = jest.fn();
            dom = (0, _react2.render)(_react["default"].createElement(_["default"], {
              numberOfInputs: 6,
              onChange: onChange,
              onComplete: jest.fn(),
              otp: "",
              disabled: false
            }));
            _context7.next = 4;
            return (0, _testUtils.act)(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee4() {
              return regeneratorRuntime.wrap(function _callee4$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return sendKey({
                        data: "1",
                        preventDefault: jest.fn()
                      });

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee4);
            })));

          case 4:
            _context7.next = 6;
            return (0, _testUtils.act)(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return sendKey({
                        data: "backSpaceKey",
                        preventDefault: jest.fn()
                      });

                    case 2:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee5);
            })));

          case 6:
            expect(onChange).toHaveBeenCalledWith("");

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee6);
  })));
  it("should call onComplete when user completes otp",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var onComplete;
    return regeneratorRuntime.wrap(function _callee7$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            onComplete = jest.fn();
            dom = (0, _react2.render)(_react["default"].createElement(_["default"], {
              numberOfInputs: 6,
              onChange: jest.fn(),
              onComplete: onComplete,
              otp: "12345",
              disabled: false
            }));
            _context8.next = 4;
            return keyOtp("6");

          case 4:
            expect(onComplete).toHaveBeenCalled();

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee7);
  })));
  it("should not accept key when disabled",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var onChange;
    return regeneratorRuntime.wrap(function _callee8$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            onChange = jest.fn();
            dom = (0, _react2.render)(_react["default"].createElement(_["default"], {
              numberOfInputs: 6,
              onChange: onChange,
              onComplete: jest.fn(),
              otp: "",
              disabled: true
            }));
            _context9.next = 4;
            return keyOtp("1");

          case 4:
            expect(dom.container.querySelector("#contentEditableBox")).toHaveAttribute("disabled");

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee8);
  })));
});
