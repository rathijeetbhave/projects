import React, { Component, PropTypes } from 'react';

class CheckboxComponent extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, value } = this.props;

    handleCheckboxChange(value);
  }

  render() {
    const { value, isChecked, withLabel, label, isDisabled} = this.props;

    if (!withLabel) {
      return (
        <input
          type="checkbox"
          value={value}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
          disabled={isDisabled}
        />
      );
    } else {
      return (
        <div class="form-group checkbox-group">
          <input
            type="checkbox"
            value={value}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          <label
            class="form-label"
          >
            {label}
          </label>
        </div>
      );
    }
  }
}

CheckboxComponent.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default CheckboxComponent;
