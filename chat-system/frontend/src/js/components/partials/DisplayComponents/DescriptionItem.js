import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

class DescriptionItem extends React.Component {
  constructor(props) {
    super(props)
  }

  renderDetailItem() {
    let { content, children, flexSize } = this.props

    if (content === 0 || !!content) {
      return (
        <div class="content">
          {content}
        </div>
      )
    } else {
      return (children)
    }

  }

  renderLabel() {
    let { label, labelClass } = this.props

    return (
      <label class={!!labelClass ? labelClass : ''}>
        {label}
      </label>
    )
  }

  renderExtraItem() {
    let { itemClass, extraItem, clickHandler } = this.props
    if (!!extraItem) {
      return (
        <div class={!!itemClass ? itemClass : ''} onClick={(e, dealEdit = false) => !!clickHandler ? clickHandler(e, dealEdit) : ''}>
          {extraItem}
        </div>
      )
    }
    else return null
  }
  renderDealClosureEdit() {
    let { editItem, clickHandler } = this.props
    if (!!editItem) {
      return (
        <div class="item-pos" onClick={(e, dealEdit = true) => !!clickHandler ? clickHandler(e, dealEdit) : ''}>
          {editItem}
        </div>
      )
    }
    else return null
  }

  render() {
    let { flexSize } = this.props
    if (!flexSize) {
      flexSize = 1
    }

    return (
      <div
        class={"detail-content " + "flex-" + flexSize}
      >
        {this.renderLabel()}
        {this.renderExtraItem()}
        {this.renderDetailItem()}
        {this.renderDealClosureEdit()}
      </div>
    )
  }
}

export default DescriptionItem
