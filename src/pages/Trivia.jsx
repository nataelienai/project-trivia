import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, fetchToken } from '../Helpers/API';

const FAILED_RESPONSE_CODE = 3;
const RANDOM_LIMIT = 0.5;
const TIMER_SECONDS = 30;
const MILLISECONDS = 1000;

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionIndex: 0,
      isLoading: true,
      wrongButtonColor: 'black',
      correctButtonColor: 'black',
      answers: [],
      seconds: TIMER_SECONDS,
      disableButtons: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.createTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  async getQuestions() {
    const { token } = this.props;
    let data = await fetchQuestions(token);
    if (data.response_code === FAILED_RESPONSE_CODE) {
      const newToken = await fetchToken();
      data = await fetchQuestions(newToken);
    }
    this.setState(
      { questions: data.results, isLoading: false },
      this.shuffleAnswers,
    );
  }

  createTimer() {
    this.timerId = setInterval(() => (
      this.setState((state) => ({ seconds: state.seconds - 1 }))
    ), MILLISECONDS);

    setTimeout(this.handleClick, TIMER_SECONDS * MILLISECONDS);
  }

  handleClick() {
    clearInterval(this.timerId);
    this.setState({
      wrongButtonColor: 'rgb(255, 0, 0)',
      correctButtonColor: 'rgb(6, 240, 15)',
      disableButtons: true,
    });
  }

  checkCorrectAnswer(answer) {
    const { questions, questionIndex } = this.state;
    return answer !== questions[questionIndex].correct_answer;
  }

  shuffleAnswers() {
    const { questions, questionIndex } = this.state;

    const answers = [
      questions[questionIndex].correct_answer,
      ...questions[questionIndex].incorrect_answers,
    ];

    answers.sort(() => Math.random() - RANDOM_LIMIT);

    this.setState({ answers });
  }

  render() {
    const {
      questions,
      questionIndex,
      isLoading,
      answers,
      wrongButtonColor,
      correctButtonColor,
      seconds,
      disableButtons,
    } = this.state;
    console.log(questions);

    return (
      <div>
        <Header />
        {isLoading ? null : (
          <div data-testid="answer-options">
            <h2 data-testid="question-text">
              {questions[questionIndex].question}
            </h2>
            <h3 data-testid="question-category">
              {questions[questionIndex].category}
            </h3>
            <h4>{`Tempo: ${seconds}`}</h4>
            {answers.map((answer, index) => (
              <button
                style={ {
                  border: this.checkCorrectAnswer(answer)
                    ? `3px solid ${wrongButtonColor}`
                    : `3px solid ${correctButtonColor}`,
                } }
                key={ answer }
                type="button"
                data-testid={ this.checkCorrectAnswer(answer)
                  ? `wrong-answer-${index}`
                  : 'correct-answer' }
                onClick={ this.handleClick }
                disabled={ disableButtons }
              >
                {answer}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Trivia);
