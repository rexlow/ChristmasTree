import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Easing
} from 'react-native';

// Detect screen size
const { width, height } = Dimensions.get('window');

class Flake extends Component {

  // Angle of falling flakes
  angle = 0

  componentWillMount() {
    // Pull x and y out of props
    const { x, y } = this.props;
    // Initialize Animated.ValueXY with passed x and y coordinates for animation
    this.setState({
      position: new Animated.ValueXY({ x, y })
    });
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    // Animation duration
    let duration = 500;
    // Pull x and y out of Animated.ValueXY object in this.state.position
    const { x: { _value: x }, y: { _value: y } } = this.state.position;
    // Pull radius and density out of props
    const { radius, density } = this.props;

    this.angle += 0.02;
    let newX = x + Math.sin(this.angle) * 10;
    let newY = y + Math.cos(this.angle + density) + 10 + radius / 2;

    // Send flakes back from the top once they exit the screen
    if (x > width + radius * 2 || x < -(radius * 2) || y > height)
    {
      duration = 0;                   // no animation
      newX = Math.random() * width;   // random x
      newY = -10;                     // above the screen top

      // Send 2/3 of flakes back to the top
      if (Math.floor(Math.random() * 3) + 1 > 1) {
        newX = Math.random() * width;
        newY = -10;
      // Send the rest to either left or right
      } else {
        // If the flake is exiting from the right
        if (Math.sin(this.angle) > 0) {
          // Enter from the left
          newX = -5;
          newY = Math.random() * height;
        } else {
          // Enter from the right
          newX = width + 5;
          newY = Math.random() * height;
        }
      }
    }

    // Animate the movement
    Animated.timing(this.state.position, {
      duration,
      easing: Easing.linear,
      toValue: {
        x: newX,
        y: newY,
      }
    }).start(() => {
      // Animate again after current animation finished
      this.animate();
    });
  }

  getStyle = ({ radius, x, y } = this.props) => ({
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: radius,
    width: radius * 2,
    height: radius * 2,
  })

  render() {
    return <Animated.View style={[this.getStyle(), this.state.position.getLayout()]} />;
  }

}

export default Flake;
