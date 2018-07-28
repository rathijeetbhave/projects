import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

class OtherItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { flexSize, children, flexGroup, itemClass } = this.props
    if(!flexSize) {
      flexSize = 1
    }

    let flexClass = "detail-content " + "flex-" + flexSize

    if(!!itemClass)
      flexClass = flexClass + " " + itemClass

    return (
      <div
        class={flexClass + (!!flexGroup ? "flex-group": "")}
      >
        {children}
      </div>
    )
  }
}

export default OtherItem
