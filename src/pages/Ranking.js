import React from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <p
          data-testid="ranking-title"
        >
          Ranking

        </p>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Iniciar Novamente
        </button>
      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
