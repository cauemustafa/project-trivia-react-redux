import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';
import Questions from '../components/Questions';

class Game extends Component {
  state = {
    showNextBtn: false,
  };

  async componentDidMount() {
    const { getQuestions } = this.props;
    const token = localStorage.getItem('token');
    await getQuestions(token);
    this.verifyToken();
  }

  verifyToken = () => {
    const { response, history } = this.props;
    const numberMagic = 3;
    if (response === numberMagic) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  render() {
    const { questions } = this.props;

    return (
      <div>
        <Header />
        <h1>
          Game
        </h1>
        {
          questions.length > 0
            && <Questions
              { ...this.state }
              showNextQuestion={ this.showNextQuestion }
            />
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

const mapStateToProps = ({ player: { questions, isFetching, response } }) => ({
  questions,
  isFetching,
  response,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.objectOf),
  getQuestions: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
