import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const MIN_ASSERTIONS = 3;

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;

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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
