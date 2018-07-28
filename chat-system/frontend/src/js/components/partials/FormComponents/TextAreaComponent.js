import React, { Component, PropTypes as T } from 'react'

import "./FormComponents.less"
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class TextAreaComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpMsg: '',
      validationState: null
    }
    this.sendValidationToForm = this.sendValidationToForm.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  checkValidation(value) {
    if (!!this.props.validation) {
      var validationState = this.props.validation(value);
      this.sendValidationToForm(validationState);
    }
  }

  sendValidationToForm(validationState) {
    var newState = { validationState: validationState };
    switch (validationState) {
      case 'success': {
        newState.helpMsg = ''
        break;
      }
      case 'warning': {
        newState.helpMsg = `${this.props.title} is not valid`
        break;
      }
      case 'error': {
        newState.helpMsg = `${this.props.title} is required`
        break;
      }
    }
    this.setState(newState)
    this.props.isValid(this.props.name, validationState)
  }

  componentDidMount() {
    if (this.props.actionType === 'Update') {
      this.checkValidation(this.props.content)
    }
  }

  changeHandler(event) {
    this.props.controlFunc(event);
    this.checkValidation(event.target.value)
  }

  render() {
    let props = this.props
    return (
      <FormGroup
      controlId={props.name + '_' + 'Id'}
      validationState={this.state.validationState}
      bsClass={props.formGroupClass ? `form-group ${props.formGroupClass}` : 'form-group'}
      >
        <ControlLabel
          bsClass={props.bsClass ? `form-label ${props.bsClass}` : 'form-label'}
        >
          {props.title} {props.isRequired ? <span class="code-red">*</span> : ''}</ControlLabel>
        <FormControl
          componentClass="textarea"
          name={props.name}
          type={props.inputType}
          value={props.content}
          onChange={this.changeHandler}
          placeholder={props.placeholder}
          bsClass={props.textClass ? `form-control ${props.textClass}` : 'form-control'}
        />
        <HelpBlock
        >
          {this.state.helpMsg}</HelpBlock>
      </FormGroup>
    );
  }
}

export default TextAreaComponent;
