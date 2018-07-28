import React, { PropTypes as T } from 'react'
import { browserHistory } from 'react-router'
import Autosuggest from 'react-autosuggest';
import "./FormComponents.less"
import "./autoSuggestTheme.less"
import { ValidationCases } from '../FormValidation/FormValidator';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'


const getSuggestions = (value, items) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : items.filter(lang =>
        lang.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
// const items = this.props.options;
const getSuggestionValue = suggestion => suggestion.label

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.label}
    </div>
);
class AutoSuggestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            helpMsg: '',
            validationState: null,
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    }

    checkValidation(value) {
        if (!!this.props.validation) {
            var validationState = this.props.validation(value);
            this.sendValidationToForm(validationState);
        }
    }

    onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
        this.props.setFinalState(suggestion.value)
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

    changeHandler(event, value) {
        this.props.controlFunc(event, value);
        this.checkValidation(event.target.value)
    }

    render() {
        let props = this.props
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: props.placeholder,
            value: props.content,
            onChange: this.changeHandler,
            disabled: props.isDisabled
        };
        const renderInputComponent = inputProps => {
            return <InputComponent inputProps={inputProps} />;
        };

        // Finally, render it!
        return (
            <FormGroup
                controlId={props.name + '_' + 'Id'}
                validationState={this.state.validationState}
                bsClass={!!props.formGroupClass ? `form-group ${props.formGroupClass}` : 'form-group'}
            >
                <ControlLabel
                // bsClass="form-label"
                >
                    {props.title}  {props.isRequired ? <span class="code-red">*</span> : ''}</ControlLabel>
                <Autosuggest
                    suggestions={props.suggestions}
                    onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={props.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderInputComponent={renderInputComponent}
                />
                <HelpBlock
                >
                    {this.state.helpMsg}</HelpBlock>
            </FormGroup>
        );
    }
}
class InputComponent extends React.Component {
    render() {
        return <div><input {...this.props.inputProps} /></div>;
    }
}

export default AutoSuggestComponent
