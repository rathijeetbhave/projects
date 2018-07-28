import React, { PropTypes as T } from 'react'

class ModalTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      let { title } = this.props

    return(
      <div class="modal-title">
        <div class="title-text">
          {title}
        </div>
      </div>
    )
  }
}

export default ModalTitle
