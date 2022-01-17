import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, fetchToken, saveRanking } from '../Helpers/API';
import calculateAndSaveScore from '../Helpers/score';

const FAILED_RESPONSE_CODE = 3;
const RANDOM_LIMIT = 0.5;
const TIMER_SECONDS = 30;
const MILLISECONDS = 1000;
const INDEX_LIMIT = 4;

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
      questionConcluded: false,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
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

    this.timeoutId = setTimeout(() => this.handleClick(''), TIMER_SECONDS * MILLISECONDS);
  }

  handleClick(answer) {
    const { questions, questionIndex, seconds } = this.state;
    const { dispatch } = this.props;

    clearInterval(this.timerId);
    clearTimeout(this.timeoutId);

    if (this.checkCorrectAnswer(answer)) {
      calculateAndSaveScore(seconds, questions[questionIndex].difficulty, dispatch);
    }
    this.setState({
      wrongButtonColor: 'rgb(255, 0, 0)',
      correctButtonColor: 'rgb(6, 240, 15)',
      questionConcluded: true,
    });
  }

  checkCorrectAnswer(answer) {
    const { questions, questionIndex } = this.state;
    return answer === questions[questionIndex].correct_answer;
  }

  sortAnswers(answers) {
    const newAnswers = [...answers];
    newAnswers.sort(() => Math.random() - RANDOM_LIMIT);
    return newAnswers;
  }

  shuffleAnswers() {
    const { questions, questionIndex } = this.state;

    const answers = [
      questions[questionIndex].correct_answer,
      ...questions[questionIndex].incorrect_answers,
    ];
    const newAnswers = this.sortAnswers(answers);

    this.setState({ answers: newAnswers });
  }

  changeQuestion() {
    const { questionIndex } = this.state;
    const { history, name, email, score } = this.props;

    if (questionIndex === INDEX_LIMIT) {
      history.push('/feedback');
      saveRanking({ name, email, score });
    } else {
      this.setState((state) => ({
        questionIndex: state.questionIndex + 1,
        seconds: TIMER_SECONDS,
        wrongButtonColor: 'black',
        correctButtonColor: 'black',
        questionConcluded: false,
      }), () => {
        this.createTimer();
        this.shuffleAnswers();
      });
    }
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
      questionConcluded,
    } = this.state;

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
                    ? `3px solid ${correctButtonColor}`
                    : `3px solid ${wrongButtonColor}`,
                } }
                key={ answer }
                type="button"
                data-testid={ this.checkCorrectAnswer(answer)
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
                onClick={ () => this.handleClick(answer) }
                disabled={ questionConcluded }
              >
                {answer}
              </button>
            ))}
            {questionConcluded && (
              <button
                onClick={ this.changeQuestion }
                data-testid="btn-next"
                type="button"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

Trivia.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Trivia);
