import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addScore } from '../redux/actions';

const de = require('he');

class Questions extends Component {
  state = {
    answers: [],
    timer: 30,
    isDisabled: false,
    showNextBtn: false,
    idTimer: 0,
    questionIndex: 0,
  };

  componentDidMount() {
    this.setTimer();
    this.ConcatAnswers();
  }

  ConcatAnswers = () => {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const concat = questions[questionIndex].incorrect_answers
      .concat(questions[questionIndex].correct_answer);

    this.setState({ answers: this.shuffleArray(concat) });
  };

  shuffleArray = (arr) => {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  };

  setTimer = () => {
    const seconds = 1000;
    this.setState({ timer: 30 });
    const idTimer = setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }));
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval(idTimer);
        this.setState({
          isDisabled: true,
          showNextBtn: true,
        });
      }
    }, seconds);
    this.setState({ idTimer });
  };

  responseAnswer = (element) => {
    this.setState({ showNextBtn: true });
    const { idTimer, timer, questionIndex } = this.state;
    const { questions, saveScore } = this.props;
    clearInterval(idTimer);
    if (element === questions[questionIndex].correct_answer) {
      const score = this.updateScore(questions[questionIndex].difficulty, timer);
      saveScore(score);
    }
  };

  updateAnwsers = () => {
    const { questionIndex } = this.state;
    const { history } = this.props;
    this.setState({
      showNextBtn: false,
      isDisabled: false,
    });
    this.incrementQuestionIndex();
    this.setTimer();
    const lastQuestion = 4;
    if (questionIndex === lastQuestion) history.push('/feedback');
  };

  incrementQuestionIndex = () => {
    this.setState(
      (state) => ({ questionIndex: state.questionIndex + 1 }),
      () => this.ConcatAnswers(),
    );
  };

  updateScore = (difficulty, timer) => {
    let results = 0;
    const number = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (difficulty) {
    case 'hard':
      results = number + (timer * hard);
      break;
    case 'medium':
      results = number + (timer * medium);
      break;
    case 'easy':
      results = number + (timer * easy);
      break;
    default:
      results = 0;
    }
    return results;
  };

  render() {
    const { answers, timer, isDisabled, showNextBtn, questionIndex } = this.state;
    const {
      questions,
    } = this.props;

    return (
      <div key={ questionIndex }>

        <h3 data-testid="question-category">
          {de.decode(questions[questionIndex].category)}
        </h3>

        <h4 data-testid="question-text">
          {de.decode(questions[questionIndex].question)}
        </h4>

        <div data-testid="answer-options">
          {
            answers.map((element, index) => (
              element === questions[questionIndex].correct_answer
                ? (
                  <button
                    className={ showNextBtn ? 'correct' : '' }
                    key={ index }
                    type="button"
                    data-testid="correct-answer"
                    onClick={ () => this.responseAnswer(element) }
                    disabled={ isDisabled }
                  >
                    {de.decode(element)}
                  </button>)
                : (
                  <button
                    className={ showNextBtn ? 'incorrect' : '' }
                    key={ index }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ () => this.responseAnswer(element) }
                    disabled={ isDisabled }
                  >
                    {de.decode(element)}
                  </button>)
            ))
          }
          {
            showNextBtn && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.updateAnwsers }
              >
                Next
              </button>)
          }
        </div>
        <p data-testid="timer">{timer}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  questions: player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(addScore(score)),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.objectOf()),
  questionIndex: PropTypes.string,
  showNextBtn: PropTypes.bool,
  responseAnswer: PropTypes.func,
  showNextQuestion: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
