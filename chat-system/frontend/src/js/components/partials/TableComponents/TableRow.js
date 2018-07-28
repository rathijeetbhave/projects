import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

class TableRow extends React.Component {
  constructor(props) {
    super(props)
  }

  renderChildren() {
    let { children } = this.props

    return (
      React.Children.map(children, (child, i) => {
        return child
      })
    )
  }

  renderTableRow() {
    let { tableClass, onClickHandler } = this.props

    return (
      <tr
        className={tableClass}
        onClick={onClickHandler}
      >
        {this.renderChildren()}
      </tr>
    )
  }

  render() {
    return (
      this.renderTableRow()
    )
  }
}

export default TableRow
