import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { email, name } = this.state;
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
          >
            Play
          </button>

        </form>

      </div>
    );
  }
}
