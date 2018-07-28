import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'
import { Grid, Row, Col, Modal } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

class ModalHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      let { header, onHide } = this.props

    return(
      <div class="modal-header">
        <div class="header-text">
          {header}
        </div>
        <FontAwesome
          name='times'
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
          tag="i"
          class="plus-icon"
          onClick={onHide}
        />
      </div>
    )
  }
}

export default ModalHeader
