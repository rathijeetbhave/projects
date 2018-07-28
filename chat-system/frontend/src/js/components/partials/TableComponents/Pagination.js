import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

import { SelectComponent } from '../FormComponents'

const PerPageOptions = [10, 25, 50];
const getValidPerPageOptions = (total) => {
  let subset = PerPageOptions;
  if (total < PerPageOptions[PerPageOptions.length - 1])
    subset = PerPageOptions.slice(0, (PerPageOptions.findIndex(x => x > total) + 1));
  return subset.map(value => { return value });
};

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.perPageChangeHandler = this.perPageChangeHandler.bind(this)
  }

  perPageChangeHandler(option) {
    let { onPerPageSelect } = this.props

    onPerPageSelect(!option ? null : option)
  }

  renderPageSelector() {
    let { noPerPageSelector } = this.props

    if (!noPerPageSelector) {
      return (
        <div class="per-page-selector-container">
          Per Page : {this.renderSelector()}
        </div>
      )
    }
  }

  renderSelector() {
    let { perPage,
      pageNumber,
      totalCount
    } = this.props

    return (
      <div class="per-page-selector">
        <SelectComponent
          name="source"
          type="text"
          selectedOption={perPage}
          controlFunc={this.perPageChangeHandler}
          options={getValidPerPageOptions(totalCount)}
          hideDefault
        />
      </div>
    )
  }

  getRangeString() {
    let { perPage,
      pageNumber,
      totalCount
    } = this.props

    var start = perPage * (pageNumber - 1) + 1
    var end = Math.min(perPage * pageNumber, totalCount)
    if(end === 0) {
      start = 0
    }

    let display = `Showing ${start} - ${end}`
    if (!!totalCount) {
      display += ` of ${totalCount}`
    }

    return (display)
  }

  renderPrevButton() {
    let { switchToPage,
      pageNumber
    } = this.props
    var prevProps = { className: 'prev-button' };

    if (pageNumber !== 1) {
      prevProps.onTouchTap = () => switchToPage(pageNumber - 1)
    } else {
      prevProps.className += " disabled"
    }

    return (
      <a {...prevProps}>
        <i class="fa fa-arrow-left" />
        &nbsp;
      </a>
    )
  }

  renderNextButton() {
    let { switchToPage,
      pageNumber,
      perPage,
      totalCount
    } = this.props

    var nextProps = { className: 'next-button' };

    if (pageNumber * perPage < totalCount) {
      nextProps.onTouchTap = () => switchToPage(pageNumber + 1)
    } else {
      nextProps.className += " disabled"
    }

    return (
      <a {...nextProps}>
        &nbsp;
        <i class="fa fa-arrow-right" />
      </a>
    )
  }

  renderPageNumber() {
    return (
      <div class="page-number-container">
        {this.renderPrevButton()}
        {this.getRangeString()}
        {this.renderNextButton()}
      </div>
    )
  }

  render() {
    return (
      <div class="page-controls-container">
        {this.renderPageSelector()}
        {this.renderPageNumber()}
      </div>
    )
  }
}

export default Pagination
