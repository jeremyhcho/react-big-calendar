import PropTypes from 'prop-types';
import React from 'react';
import getOffset from 'dom-helpers/query/offset';
import getScrollTop from 'dom-helpers/query/scrollTop';
import getScrollLeft from 'dom-helpers/query/scrollLeft';

import EventCell from './EventCell';
import { isSelected } from './utils/selection';
import localizer from './localizer';
import { elementType, dateFormat } from './utils/propTypes';

const propTypes = {
  position: PropTypes.object,
  popupOffset: PropTypes.number,
  events: PropTypes.array,
  selected: PropTypes.object,
  eventComponent: elementType,
  eventWrapperComponent: elementType,
  dayHeaderFormat: dateFormat,
  showMoreRef: PropTypes.object
}

class Popup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount(){
    let { popupOffset = 5 } = this.props
      , { top, left, width, height } = getOffset(this.root)
      , viewBottom = window.innerHeight + getScrollTop(window)
      , viewRight = window.innerWidth + getScrollLeft(window)
      , bottom = top + height
      , right = left + width

    if (bottom > viewBottom || right > viewRight) {
      let topOffset, leftOffset;

      if (bottom > viewBottom)
        topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0)
      if (right > viewRight)
        leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0)

      this.setState({ topOffset, leftOffset }) //eslint-disable-line
    }

    const rect = this.root.getBoundingClientRect()

    console.log(rect)

    this.setState({
      y: rect.y,
      top: rect.top,
      height: rect.height,
      bottom: rect.bottom,
      left: rect.left
    })
  }

  componentWillReceiveProps () {
    const rect = this.root.getBoundingClientRect()
    this.setState({
      y: rect.y,
      top: rect.top,
      height: rect.height,
      bottom: rect.bottom,
      left: rect.left
    })
  }

  render() {
    let { events, selected, eventComponent, eventWrapperComponent, ...props } = this.props;

    let { left, width, top } = this.props.position
      , topOffset = ((this.state.height || 0) / 2) - document.querySelector('.rbc-month-row').clientHeight + 30
      , leftOffset = -100

    const trueTop = top - topOffset

    let style = {
      top: this.state.bottom > window.innerHeight ? `calc(100% - ${this.state.height - 35}px)` : trueTop,
      left: left - leftOffset,
      minWidth: width + (width / 2)
    }

    const arrowTop = this.props.showMoreRef.getBoundingClientRect().top - 9
    const arrowLeft = this.state.left

    return (
      <div ref={root => this.root = root} style={style} className='rbc-overlay'>
        <div style={{
          position: 'fixed',
          left: arrowLeft - 9,
          top: arrowTop,
          borderTop: '9px solid transparent',
          borderBottom: '9px solid transparent',
          borderRight: '9px solid #fff'
        }} />

        <div style={{
          position: 'fixed',
          left: arrowLeft - 11,
          top: arrowTop,
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderRight: '10px solid #E8E8E8'
        }} />

        <div className='rbc-overlay-header'>
          { localizer.format(props.slotStart, props.dayHeaderFormat, props.culture) }
        </div>
        {
          events.map((event, idx) =>
            <EventCell key={idx}
              {...props}
              event={event}
              eventComponent={eventComponent}
              eventWrapperComponent={eventWrapperComponent}
              selected={isSelected(event, selected)}
            />
          )
        }
      </div>
    )
  }
}

Popup.propTypes = propTypes;

export default Popup;
