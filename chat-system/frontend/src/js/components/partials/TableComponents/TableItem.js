import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

class TableItem extends React.Component {
  constructor(props) {
    super(props)
  }

  renderItem() {
    let { content, children, onClickHandler, tableClass } = this.props

    if (!!content) {
      return (
        <td
          class={tableClass}
        >
          {content}
        </td>
      )
    } else {
      return (
        <td
          class={tableClass}
          onClick={onClickHandler}
        >
          {children}
        </td>
      )
    }
  }

  render() {
    return this.renderItem()
  }
}

export default TableItem
