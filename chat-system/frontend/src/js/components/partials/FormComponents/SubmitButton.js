import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'

import "./FormComponents.less"

class SubmitButton extends React.Component {

  render() {
    let props = this.props
    if (!!props.showLoader) {
      var btnClass = "filter-submit submitting " + props.btnClass
    }
    else {
      var btnClass = "filter-submit " + props.btnClass
    }
    return (
      <div
        class={props.show === false ? "no-display" : props.bsClass}>
        <button
          type="submit"
          class={btnClass}
          onClick={props.controlFunc}
          disabled={props.isDisabled}
        >
          {props.title}
        </button>
      </div>
    )
  }
}

SubmitButton.propTypes = {
  title: T.string.isRequired,
  controlFunc: T.func.isRequired,
  btnClass: T.string,
  bsClass: T.string
}

export default SubmitButton
