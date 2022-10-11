import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addRank, clearScore } from '../redux/actions';

class Ranking extends React.Component {
  componentDidMount() {
    const { addPlayerToRank } = this.props;
    const rankPlayer = JSON.parse(localStorage.getItem('player'));
    const { name, hash, score } = rankPlayer;
    addPlayerToRank(name, hash, score);
  }

  goHomeBtn = () => {
    const { history, clearPlayerScore } = this.props;
    clearPlayerScore();
    history.push('/');
  };

  render() {
    const { ranking } = this.props;

    return (
      <div>
        <h2
          data-testid="ranking-title"
        >
          Ranking
        </h2>

        <ol>
          {
            ranking.map((player, index) => (
              <li key={ index }>
                <img
                  src={ `https://www.gravatar.com/avatar/${player.hash}` }
                  alt={ `foto-user-${player.name}` }
                  width="30"
                  heigth="30"
                  data-testid="player-profile-picture"
                />
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p data-testid={ `player-score-${index}` }>{ player.score }</p>
              </li>
            ))
          }
        </ol>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHomeBtn }
        >
          Play Again
        </button>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearPlayerScore: () => dispatch(clearScore()),
  addPlayerToRank: (name, hash, score) => dispatch(addRank(name, hash, score)),
});

const mapStateToProps = ({ player: { ranking } }) => ({
  ranking,
});
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
