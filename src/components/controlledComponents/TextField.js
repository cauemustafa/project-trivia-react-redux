import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextField extends Component {
  render() {
    const { id, children, type, name, value, onChange, placeholder } = this.props;

    return (
      <label htmlFor={ id }>
        {children}
        <input
          type={ type }
          id={ id }
          data-testid={ id }
          name={ name }
          value={ value }
          onChange={ onChange }
          placeholder={ placeholder }
        />
      </label>
    );
  }
}

TextField.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
}.isRequired;
