import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>
          Game
        </h1>
      </div>
    );
  }
}

export default connect()(Game);
