import React, { PropTypes as T } from 'react'

import "./FormComponents.less"
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

const checkOnlyNumber = (value) => {
  const re = (/^[0-9\b]+$/)
  if (re.test(value))
    return true
  else
    return false
}
const checkOnlyText = (value) => {
  const re = (/^[a-zA-Z ]+$/)
  if (re.test(value))
    return true
  else
    return false
}
const checkOnlyFloat = (value) => {
  const re = (/^[0-9.]*$/)
  if (re.test(value))
    return true
  else
    return false
}
class InputComponent extends React.Component {
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
        if (!!this.props.delimeter && !!this.props.limitValue) {
          newState.helpMsg = (this.props.delimeter == 'max') ? `${this.props.title} can't be more than ${this.props.limitValue} ${this.props.extraField}` : `${this.props.title} can't be less than ${this.props.limitValue} ${this.props.extraField}`
        }
        else {
          newState.helpMsg = !!this.props.title ? `${this.props.title} is not valid` : 'This is not valid'
        }
        break;
      }
      case 'error': {
        newState.helpMsg = !!this.props.title ? `${this.props.title} is required` : 'This is required field'
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
    let { validationType } = this.props
    if (!!validationType && validationType === "number") {
      if ((event.target.value == '' || checkOnlyNumber(event.target.value))) {
        this.props.controlFunc(event);
        this.checkValidation(event.target.value)
      }
    }
    else if (!!validationType && validationType === "float") {
      if ((event.target.value == '' || checkOnlyFloat(event.target.value))) {
        this.props.controlFunc(event);
        this.checkValidation(event.target.value)
      }
    }
    else {
      this.props.controlFunc(event);
      this.checkValidation(event.target.value)
    }
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
          // bsClass="form-input"
          name={props.name}
          type="text"
          value={props.content}
          onChange={this.changeHandler}
          placeholder={props.placeholder}
          bsClass={props.inputClass ? `form-control ${props.inputClass}` : 'form-control'}
          maxLength="50"
          readOnly={props.readOnly}
          onBlur={props.onBlur}
        />
        <HelpBlock
        >
          {this.state.helpMsg}</HelpBlock>
      </FormGroup>
    )
  }
}

InputComponent.propTypes = {
  inputType: T.oneOf(['text', 'number']).isRequired,
  title: T.string.isRequired,
  name: T.string.isRequired,
  content: T.string,
  placeHolder: T.string
}

export default InputComponent
