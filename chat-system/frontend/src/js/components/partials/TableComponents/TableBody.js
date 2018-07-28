import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

class TableBody extends React.Component {
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

  renderTableBody() {
    let { tableClass } = this.props

    return (
      <tbody
        className={tableClass}
      >
        {this.renderChildren()}
      </tbody>
    )
  }

  render() {
    return (
      this.renderTableBody()
    )
  }
}

export default TableBody
