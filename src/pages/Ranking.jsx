import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RankingList from '../components/RankingList';
import { resetUser } from '../Redux/Actions';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin() {
    const { resetPlayerData, history } = this.props;
    resetPlayerData();
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <RankingList />
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.redirectToLogin }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetPlayerData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetPlayerData: () => dispatch(resetUser()),
});

export default connect(null, mapDispatchToProps)(Ranking);
