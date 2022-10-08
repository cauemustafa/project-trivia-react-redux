import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { avatar, nome } = this.props;
    return (
      <header>
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${avatar}` }
            alt="foto-user"
            width="64"
            heigth="64"
            data-testid="header-profile-picture"
          />
        </div>
        <p data-testid="header-player-name">{nome}</p>
        <p>
          Score:
          {' '}
          <span data-testid="header-score">0</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  avatar: player.hash,
  nome: player.name,
});

Header.propTypes = {
  hash: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
