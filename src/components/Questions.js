import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  state = {
    answers: [],
    timer: 30,
    isDisabled: false,
  };

  componentDidMount() {
    this.setState({ answers: this.ConcatAnswers() });
    this.setTimer();
  }

  ConcatAnswers = () => {
    const { questions, questionIndex } = this.props;
    const concat = questions[questionIndex].incorrect_answers
      .concat(questions[questionIndex].correct_answer);
    return this.shuffleArray(concat);
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

    const idTimer = setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }));
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval(idTimer);
        this.setState({ isDisabled: true, timer: 30 });
      }
    }, seconds);
  };

  render() {
    const { answers, timer, isDisabled } = this.state;
    const {
      questions,
      questionIndex,
      showNextBtn,
      responseAnswer,
      // showNextQuestion,
    } = this.props;

    return (
      <div key={ questionIndex }>

        <h3 data-testid="question-category">
          {questions[questionIndex].category}
        </h3>

        <h4 data-testid="question-text">
          {questions[questionIndex].question}
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
                    onClick={ responseAnswer }
                    disabled={ isDisabled }
                  >
                    { element }
                  </button>)
                : (
                  <button
                    className={ showNextBtn ? 'incorrect' : '' }
                    key={ index }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ responseAnswer }
                    disabled={ isDisabled }
                  >
                    { element }
                  </button>)
            ))
          }
        </div>
        <p>{timer}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  questions: player.questions,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.objectOf()),
  questionIndex: PropTypes.string,
  showNextBtn: PropTypes.bool,
  responseAnswer: PropTypes.func,
  showNextQuestion: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Questions);

// How to shuffle elements of an array in JavaScript with sort:
// https://sebhastian.com/shuffle-array-javascript/#:~:text=A%20JavaScript%20array%20elements%20can,using%20the%20sort()%20method.&text=The%20JavaScript%20Array%20sort(),value%20returned%20by%20that%20function.
