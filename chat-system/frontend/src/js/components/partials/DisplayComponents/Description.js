import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

class Description extends React.Component {
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

  renderHeader() {
    let { headerContent, headerClass } = this.props

    if (!!headerContent) {
      return (
        <div
          class={ !!headerClass ? headerClass : "detail-head" }
        >
          { headerContent }
        </div>
      )
    }
  }

  render() {
    let { descriptionClass } = this.props
    
    return (
      <div class={ !!descriptionClass ? descriptionClass + " detail-section" : "detail-section" }>
        {this.renderHeader()}
        <div class="detail-contents">
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

export default Description
