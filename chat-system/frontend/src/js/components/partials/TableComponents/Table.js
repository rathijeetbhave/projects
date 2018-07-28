import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

class Table extends React.Component {
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

  renderTable() {
    let { tableClass } = this.props

    return (
      <table
        class={(tableClass || '') + " table table-hover "} width="100%"
      >
        {this.renderChildren()}
      </table>
    )
  }

  render() {
    return (
      this.renderTable()
    )
  }
}

export default Table
