import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  getImage = (email) => md5(email).toString();

  render() {
    const { name, email, score } = this.props;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${this.getImage(email)}` }
          alt="avatar"
        />
        <p data-testid="header-player-name">
          { name }
        </p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
