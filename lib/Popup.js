'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _offset = require('dom-helpers/query/offset');

var _offset2 = _interopRequireDefault(_offset);

var _scrollTop = require('dom-helpers/query/scrollTop');

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _scrollLeft = require('dom-helpers/query/scrollLeft');

var _scrollLeft2 = _interopRequireDefault(_scrollLeft);

var _EventCell = require('./EventCell');

var _EventCell2 = _interopRequireDefault(_EventCell);

var _selection = require('./utils/selection');

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _propTypes3 = require('./utils/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  position: _propTypes2.default.object,
  popupOffset: _propTypes2.default.number,
  events: _propTypes2.default.array,
  selected: _propTypes2.default.object,
  eventComponent: _propTypes3.elementType,
  eventWrapperComponent: _propTypes3.elementType,
  dayHeaderFormat: _propTypes3.dateFormat,
  showMoreRef: _propTypes2.default.object
};

var Popup = function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup(props) {
    _classCallCheck(this, Popup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  Popup.prototype.componentDidMount = function componentDidMount() {
    var _props$popupOffset = this.props.popupOffset,
        popupOffset = _props$popupOffset === undefined ? 5 : _props$popupOffset,
        _getOffset = (0, _offset2.default)(this.root),
        top = _getOffset.top,
        left = _getOffset.left,
        width = _getOffset.width,
        height = _getOffset.height,
        viewBottom = window.innerHeight + (0, _scrollTop2.default)(window),
        viewRight = window.innerWidth + (0, _scrollLeft2.default)(window),
        bottom = top + height,
        right = left + width;

    if (bottom > viewBottom || right > viewRight) {
      var topOffset = void 0,
          leftOffset = void 0;

      if (bottom > viewBottom) topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0);
      if (right > viewRight) leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0);

      this.setState({ topOffset: topOffset, leftOffset: leftOffset }); //eslint-disable-line
    }

    var rect = this.root.getBoundingClientRect();

    this.setState({
      y: rect.y,
      top: rect.top,
      height: rect.height,
      width: rect.width,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right
    });
  };

  Popup.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    var rect = this.root.getBoundingClientRect();
    this.setState({
      y: rect.y,
      top: rect.top,
      height: rect.height,
      width: rect.width,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right
    });
  };

  Popup.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        events = _props.events,
        selected = _props.selected,
        eventComponent = _props.eventComponent,
        eventWrapperComponent = _props.eventWrapperComponent,
        props = _objectWithoutProperties(_props, ['events', 'selected', 'eventComponent', 'eventWrapperComponent']);

    var _props$position = this.props.position,
        left = _props$position.left,
        width = _props$position.width,
        top = _props$position.top,
        topOffset = (this.state.height || 0) / 2 - document.querySelector('.rbc-month-row').clientHeight + 30,
        leftOffset = -100;


    var trueTop = top - topOffset;
    var showMoreRectTop = this.props.showMoreRef.getBoundingClientRect().top - 9;
    var absoluteTop = this.state.bottom > window.innerHeight ? 'calc(100% - ' + (this.state.height - 5) + 'px)' : trueTop;
    var right = this.state.left + this.state.width < window.innerWidth;
    var positionStyles = {
      leftPopup: {
        main: {
          top: absoluteTop,
          left: left - (this.state.width || 0) - 10,
          minWidth: width + width / 2
        },
        smallArrow: {
          position: 'fixed',
          top: (showMoreRectTop || 0) + 6,
          left: left + 100 - 1 - 10,
          borderTop: '9px solid transparent',
          borderBottom: '9px solid transparent',
          borderLeft: '9px solid #fff',
          zIndex: 2
        },
        bigArrow: {
          position: 'fixed',
          left: left + 100 - 10,
          top: (showMoreRectTop || 0) + 5,
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderLeft: '10px solid #E8E8E8'
        }
      },
      rightPopup: {
        main: {
          top: absoluteTop,
          left: left - leftOffset,
          minWidth: width + width / 2
        },
        smallArrow: {
          position: 'fixed',
          left: (this.state.left || 0) - 8,
          top: showMoreRectTop + 6,
          borderTop: '9px solid transparent',
          borderBottom: '9px solid transparent',
          borderRight: '9px solid #fff',
          zIndex: 2
        },
        bigArrow: {
          position: 'fixed',
          left: (this.state.left || 0) - 10,
          top: showMoreRectTop + 5,
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderRight: '10px solid #E8E8E8'
        }
      }
    };

    return _react2.default.createElement(
      'div',
      {
        ref: function ref(root) {
          return _this2.root = root;
        },
        style: right ? positionStyles.rightPopup.main : positionStyles.leftPopup.main,
        className: 'rbc-overlay'
      },
      _react2.default.createElement('div', { style: right ? positionStyles.rightPopup.smallArrow : positionStyles.leftPopup.smallArrow }),
      _react2.default.createElement('div', { style: right ? positionStyles.rightPopup.bigArrow : positionStyles.leftPopup.bigArrow }),
      _react2.default.createElement(
        'div',
        { className: 'rbc-overlay-header' },
        _localizer2.default.format(props.slotStart, props.dayHeaderFormat, props.culture)
      ),
      events.map(function (event, idx) {
        return _react2.default.createElement(_EventCell2.default, _extends({ key: idx
        }, props, {
          event: event,
          eventComponent: eventComponent,
          eventWrapperComponent: eventWrapperComponent
        }));
      })
    );
  };

  return Popup;
}(_react2.default.Component);

Popup.propTypes = propTypes;

exports.default = Popup;
module.exports = exports['default'];