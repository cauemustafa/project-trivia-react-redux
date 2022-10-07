import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SubmitButton extends Component {
  render() {
    const { id, disabled, children } = this.props;
    return (
      <button
        type="submit"
        id={ id }
        data-testid={ id }
        disabled={ disabled }
      >
        {children}
      </button>
    );
  }
}

SubmitButton.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.func,
}.isRequired;
