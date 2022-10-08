import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingApiToken } from '../redux/actions';

// Componentes controlado
import TextField from '../components/controlledComponents/TextField';
import SubmitButton from '../components/controlledComponents/SubmitButton';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    isDisabled: true,
    carregando: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateButton);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { getToken } = this.props;
    getToken();
    this.setState({ carregando: true });
  };

  validateButton = () => {
    const { name, gravatarEmail } = this.state;
    const validate = this.validateEmail(gravatarEmail);
    this.setState({ isDisabled: !(name.length > 0 && validate) });
  };

  validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  render() {
    const { name, gravatarEmail, isDisabled, carregando } = this.state;
    const { isFetching, token } = this.props;

    return (
      <div>
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
        { carregando && <p>Carregando...</p> }
        { isFetching && <Redirect to="game" />}
        { isFetching && localStorage.setItem('token', token)}
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Settings
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  isFetching: player.isFetching,
  token: player.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchingApiToken()),
});

Login.propTypes = {
  getToken: PropTypes.func,
  isFetching: PropTypes.bool,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
