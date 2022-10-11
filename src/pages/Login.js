import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, addUser } from '../redux/actions';

// Componentes controlado
import TextField from '../components/controlledComponents/TextField';
import SubmitButton from '../components/controlledComponents/SubmitButton';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    isDisabled: true,
    isLoading: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateButton);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, gravatarEmail } = this.state;
    const { getToken, addGlobalUser } = this.props;
    addGlobalUser(name, gravatarEmail);
    getToken();
    this.setState({ isLoading: true });
  };

  validateButton = () => {
    const { name, gravatarEmail } = this.state;
    const validate = this.validateEmail(gravatarEmail);
    this.setState({ isDisabled: !(name.length > 0 && validate) });
  };

  validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  render() {
    const { name, gravatarEmail, isDisabled, isLoading } = this.state;
    const { isFetching, token, error } = this.props;

    return isLoading ? (
      <div>
        <Loading />
        { !isFetching && localStorage.setItem('token', token) }
        { !isFetching && !error && <Redirect to="game" /> }
        {/* { error && <Redirect to="error" /> } */}
      </div>
    ) : (
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
  error: player.error,
  errorMessage: player.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  addGlobalUser: (name, email) => dispatch(addUser(name, email)),
});

Login.propTypes = {
  getToken: PropTypes.func,
  isFetching: PropTypes.bool,
  error: PropTypes.bool,
  token: PropTypes.string,
  addUsuario: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
