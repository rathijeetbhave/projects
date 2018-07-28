import React, { PropTypes as T } from 'react'
import { titleCase } from 'change-case'

import "./FormComponents.less"

import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpMsg: '',
      validationState: null,
      isDisabled: false
    }
    this.sendValidationToForm = this.sendValidationToForm.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let { validation, options } = nextProps;

    if (!!options && options.length > 0) {
      this.setState({
        isDisabled: false
      })
    }
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
      this.checkValidation(this.props.selectedOption)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!!this.props.loadingState && prevProps.selectedOption != this.props.selectedOption) {
      this.checkValidation(this.props.selectedOption)
    }
  }

  changeHandler(event) {
    this.props.controlFunc(event);
    this.checkValidation(event.target.value)
  }

  renderDefault() {
    let { hideDefault, placeholder } = this.props

    if (!hideDefault) {
      return (<option value=''>{placeholder}</option>)
    } else {
      return null
    }
  }

  renderOptions() {
    let { options, labelKey, valueKey, noTitleize, perOptionTitaliez, titliez } = this.props

    if (!options) {
      return null
    }

    if (!!options && options.length > 0) {
      if ((!!labelKey && !!valueKey) || !!titliez) {
        return options.map(opt => {
          var labelText = !!perOptionTitaliez ? opt[titliez] ? titleCase(opt[labelKey]) : opt[labelKey] : !!noTitleize ? opt[labelKey] : titleCase(opt[labelKey])
          return (
            <option
              key={opt[valueKey]}
              value={opt[valueKey]}>{labelText}</option>
          );
        })
      } else {
        return options.map(opt => {
          var labelText = !!noTitleize ? opt : titleCase(opt)
          return (
            <option
              key={opt}
              value={opt}>{titleCase(opt)}</option>
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
        bsClass={props.formGroupClass ? `form-group ${props.formGroupClass}` : 'form-group'}
      >
        <ControlLabel
          bsClass={props.bsClass ? `form-label ${props.bsClass}` : 'form-label'}
        >
          {props.title}  {props.isRequired ? <span class="code-red">*</span> : ''}</ControlLabel>
        <FormControl
          // bsClass="form-input"
          componentClass="select"
          name={props.name}
          value={props.selectedOption}
          onChange={this.changeHandler}
          disabled={!!props.isDisabled ? props.isDisabled : this.state.isDisabled}
          bsClass={props.selectClass ? `form-control ${props.selectClass}` : 'form-control'}
        >
          {this.renderDefault()}
          {this.renderOptions()}
        </FormControl>
        <HelpBlock
        >
          {this.state.helpMsg}</HelpBlock>
      </FormGroup>
    )

  }
}

SelectComponent.propTypes = {
  title: T.string,
  name: T.string,
  options: T.array,
  selectedOption: T.string,
  controlFunc: T.func.isRequired,
  placeholder: T.string
}

export default SelectComponent
