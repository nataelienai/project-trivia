import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestToken, setPlayer } from '../Redux/Actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(requestToken());
    dispatch(setPlayer(email, name));
    history.push('/Trivia');
  }

  render() {
    const { email, name } = this.state;
    const { history } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              value={ email }
              data-testid="input-gravatar-email"
              type="email"
              placeholder="digite o seu e-mail"
              name="email"
              id="email"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="name">
            <input
              value={ name }
              data-testid="input-player-name"
              type="name"
              placeholder="digite o seu nome"
              name="name"
              id="name"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ email.length < 1 || name.length < 1 }
            onClick={ this.handleSubmit }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
