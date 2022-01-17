import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetUser } from '../Redux/Actions';

const MIN_ASSERTIONS = 3;

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { resetPlayerData, history } = this.props;
    resetPlayerData();
    history.push('/');
  }

  render() {
    const { assertions, score, history } = this.props;

    return (
      <div>
        <Header />

        <h2 data-testid="feedback-text">
          {assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
        </h2>

        <p>
          Total Score:
          {' '}
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </p>

        <p>
          Assertions:
          {' '}
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
        </p>

        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgain }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetPlayerData: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayerData: () => dispatch(resetUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
