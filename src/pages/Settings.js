import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Settings extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title">
          Settings
        </h1>
        <button
          type="button"
          onClick={ () => history.push('/') }
        >
          Go home
        </button>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Settings);
