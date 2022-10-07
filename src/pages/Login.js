import React, { Component } from 'react';

import TextField from '../components/controlledComponents/TextField';
import SubmitButton from '../components/controlledComponents/SubmitButton';
import Header from '../components/Header';

export default class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    isDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateButton);
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  validateButton = () => {
    const { name, gravatarEmail } = this.state;
    this.setState({ isDisabled: !(name.length > 0 && gravatarEmail.length > 0) });
  };

  render() {
    const { name, gravatarEmail, isDisabled } = this.state;

    return (
      <div>
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <TextField
            type="text"
            id="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          >
            Nome
          </TextField>
          <TextField
            type="text"
            id="input-gravatar-email"
            name="gravatarEmail"
            value={ gravatarEmail }
            onChange={ this.handleChange }
          >
            Gravatar Email
          </TextField>
          <SubmitButton
            id="btn-play"
            disabled={ isDisabled }
          >
            Play
          </SubmitButton>
        </form>
      </div>
    );
  }
}
