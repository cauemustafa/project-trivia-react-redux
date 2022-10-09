import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Error extends Component {
  render() {
    const { message } = this.props;
    return (
      <div>
        <h1>Error!</h1>
        <p>{ message }</p>
        <Link to="/">
          <button
            type="button"
          >
            Tentar novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  message: player.errorMessage,
});

Error.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Error);
