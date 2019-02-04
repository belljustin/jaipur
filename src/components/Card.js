import React, { Component } from 'react';
import './Card.css';

import camelImg from '../resources/camel.png'
import cowImg from '../resources/cow.png'
import diamondImg from '../resources/diamond.png'
import goldImg from '../resources/gold.png'
import rubyImg from '../resources/ruby.png'
import silverImg from '../resources/silver.png'

class Card extends Component {
  constructor(props) {
    super(props);
    this.img = selectImg(this.props.name);
  }

  render() {
    return (
      <div 
        className={"card " + (this.props.selected ? "selected" : "")} 
        onClick={this.props.onClick}>

        <div className="imageContainer">
          <img src={this.img} alt="card" />
        </div>

        <div className="textContainer">
          <h4><b>{this.props.name}</b></h4> 
        </div>

      </div>
    );
  }
}

function selectImg(name) {
  switch (name) {
    case 'Camel':
      return camelImg;
    case 'Cow':
      return cowImg;
    case 'Diamond':
      return diamondImg;
    case 'Gold':
      return goldImg;
    case 'Ruby':
      return rubyImg;
    case 'Silver':
      return silverImg;
    default:
      throw Error(name + " does not have an image");
  }
}

function makeCard(name) {
  return {
    name: name,
    selected: false
  };
}

export default Card;
export { makeCard };
