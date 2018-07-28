import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

class TableHeaderItem extends React.Component {
  constructor(props) {
    super(props)
  }

  renderTableHeaderItem() {
    let { className, tableStyle, content, headerType, children } = this.props;

    if (!!content) {
      return (
        <th style={tableStyle} className={className}>
          {content}
        </th>
      )
    } else {
      return (
        <th style={tableStyle}>
          {children}
        </th>
      )
    }
  }

  render() {
    return this.renderTableHeaderItem()
  }
}

export default TableHeaderItem
