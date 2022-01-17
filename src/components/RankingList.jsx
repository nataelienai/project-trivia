import React, { Component } from 'react';
import { getImage, getRanking } from '../Helpers/API';

export default class RankingList extends Component {
  render() {
    const ranking = getRanking();

    return (
      <ol>
        {ranking.sort((a, b) => b.score - a.score).map(({ email, name, score }, i) => (
          <li key={ i }>
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${getImage(email)}` }
              alt="avatar"
            />
            <p>
              <span data-testid={ `player-name-${i}` }>{ name }</span>
              <span data-testid={ `player-score-${i}` }>{ score }</span>
            </p>
          </li>
        ))}
      </ol>
    );
  }
}
