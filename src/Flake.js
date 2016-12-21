import React, { Component } from 'react';
import {
  View
} from 'react-native';

class Flake extends Component {

  getStyle = ({ radius, x, y } = this.props) => ({
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: radius,
    width: radius * 2,
    height: radius * 2,
    top: y,
    left: x,
  })

  render() {
    return (
      <View style={this.getStyle()} />
    )
  }
}

export default Flake;
