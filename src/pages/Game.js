import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>
        <h1>
          Game
        </h1>
      </div>
    );
  }
}

export default connect()(Game);
