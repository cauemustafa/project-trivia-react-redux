import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { clearScore } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, hash } = this.props;
    const player = { name, score, hash };
    localStorage.setItem('player', JSON.stringify(player));
  }

  playAgainBtn = () => {
    const { clearPlayerScore, history } = this.props;
    clearPlayerScore();
    history.push('/');
  };

  render() {
    const { assertions, score, history } = this.props;
    const number = 3;
    return (
      <div>
        <Header />
        { assertions >= number
          ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <p data-testid="feedback-total-question">
          { assertions }
        </p>
        <p
          data-testid="feedback-total-score"
        >
          { score }
        </p>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgainBtn }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearPlayerScore: () => dispatch(clearScore()),
});

const mapStateToProps = ({ player: { assertions, score, name, hash } }) => ({
  assertions,
  score,
  name,
  hash,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  hash: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
