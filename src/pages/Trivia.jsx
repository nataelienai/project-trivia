import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, fetchToken } from '../Helpers/API';

const FAILED_RESPONSE_CODE = 3;
const RANDOM_LIMIT = 0.5;

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionIndex: 0,
      isLoading: true,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { token } = this.props;
    let data = await fetchQuestions(token);
    if (data.response_code === FAILED_RESPONSE_CODE) {
      const newToken = await fetchToken();
      data = await fetchQuestions(newToken);
    }
    this.setState({ questions: data.results, isLoading: false });
  }

  renderAnswers() {
    const { questions, questionIndex } = this.state;
    const incorrectAnswers = questions[questionIndex].incorrect_answers
      .map((answer, index) => (
        <button
          key={ answer }
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          {answer}
        </button>
      ));

    const answers = [
      ...incorrectAnswers,
      <button
        key={ questions[questionIndex].correct_answer }
        type="button"
        data-testid="correct-answer"
      >
        {questions[questionIndex].correct_answer}
      </button>,
    ];
    answers.sort(() => Math.random() - RANDOM_LIMIT);
    return answers;
  }

  render() {
    const { questions, questionIndex, isLoading } = this.state;
    console.log(questions, questionIndex);
    return (
      <div>
        <Header />
        {isLoading ? null : (
          <div data-testid="answer-options">
            <h2 data-testid="question-text">{ questions[questionIndex].question }</h2>
            <h3 data-testid="question-category">{ questions[questionIndex].category }</h3>
            { this.renderAnswers() }
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
