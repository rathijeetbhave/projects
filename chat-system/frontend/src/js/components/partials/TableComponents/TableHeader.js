import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

class TableHeader extends React.Component {
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

  renderTableHeader() {

    return (
      <thead className={this.props.className}>
        <tr>
          {this.renderChildren()}
        </tr>
      </thead>
    )
  }

  render() {
    return (
      this.renderTableHeader()
    )
  }
}

export default TableHeader
