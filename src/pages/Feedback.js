import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const number = 3;
    return (
      <div>
        <Header />
        { assertions >= number
          ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions } }) => ({
  assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
