import React, { PropTypes as T } from 'react'
import { titleCase } from 'change-case'

import "./FormComponents.less"
import { FormGroup, FormControl, Radio, HelpBlock, ControlLabel } from 'react-bootstrap';

class RadioButtonComponent extends React.Component {
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

  renderRadioBtns() {
    let { options, labelKey, valueKey, selectedRadio, noTitleCase } = this.props

    if (!!options && options.length > 0) {
      if (!!labelKey && !!valueKey) {
        return options.map(opt => {
          return (
            <Radio
              name="radioGroup"
              inline
              key={opt[valueKey]}
              value={opt[valueKey]}
              checked={selectedRadio === opt[valueKey]}
              onClick={this.changeHandler}
            >
              {!!noTitleCase ? opt[labelKey] : titleCase(opt[labelKey])}
            </Radio>
          );
        })
      } else {
        return options.map(opt => {
          return (
            <Radio
              name="radioGroup"
              inline
              key={opt}
              value={opt}
              checked={selectedRadio === opt}
            >
              {titleCase(opt)}
            </Radio>
          );
        })
      }
    } else
      return null
  }

  render() {
    let props = this.props
    return (
      <FormGroup
        controlId={props.name + '_' + 'Id'}
        validationState={this.state.validationState}
      >
        <ControlLabel
          bsClass="form-label"
        >
          {props.title} {props.isRequired ? <span class="code-red">*</span> : ''}
        </ControlLabel>
        <div class={props.bsClass ? `radio-group ${props.bsClass}` : "radio-group"}>
          {this.renderRadioBtns()}
        </div>
        <HelpBlock
        >
          {this.state.helpMsg}</HelpBlock>
      </FormGroup>
    )
  }
}

RadioButtonComponent.propTypes = {
  title: T.string.isRequired,
  name: T.string.isRequired,
  options: T.array,
  controlFunc: T.func.isRequired,
}

export default RadioButtonComponent
