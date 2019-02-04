import React, { Component } from 'react';
import './Card.css';

class Token extends Component {
  render() {
    return (
      <div className="token" />
        {this.props.value}
      </div>
    );
  }
}

export default Token;
