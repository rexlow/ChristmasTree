import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View
} from 'react-native';

import Flake from './Flake';

const { width, height } = Dimensions.get('window');

class Tree extends Component {

  static defaultProps = { flakesCount: 50 }

  componentWillMount() {
    this.initState()
  }

  componentDidMount() {
    setInterval(this.animate, 10); //update flakes position every 10ms
  }

  initState = () => {
    const { flakesCount } = this.props;
    let particles = [];

    for (let i = 0; i < flakesCount; i++) {
      //generate random coordinates, radius and density
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 4 + 1,
        d: Math.random() * flakesCount
      });
    }

    this.setState({
      angle: 0,
      particles //es6 naming convention trick
    });
  }

  animate = () => {
    const { angle, particles } = this.state,
      newAngle = angle + 0.01;

    //go through existing particles and update coordinates
    const newParticles = particles.map((particle, index) => {
      //create vertical and horizontal movement
      let x = particle.x + Math.sin(angle) * 2;
      let y = particle.y + Math.cos(angle + particle.d) + 1 + particle.r / 2;

      //reposition flakes to the top
      if (particle.x > width + 5 || particle.x < -5 || particle.y > height) {
        if (index % 3 > 0) { //66.67% of the flakes
          x = Math.random() * width;
          y = -10;
        } else {
          if (Math.sin(angle) > 0) { //if flakes exitting from the right
            x = -5; //enter from the left
            y = Math.random() * height;
          } else {
            x = width + 5; //enter from the right
            y = Math.random() * height;
          }
        }
      }

      return {
        ...particle,
        x: x,
        y: y
      };

    });

    this.setState({
      angle: newAngle,
      particles: newParticles
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={require('./tree.jpg')} >
         {this.state.particles.map((particle, index) =>
           <Flake
             radius={particle.r}
             x={particle.x}
             y={particle.y}
             key={index} />
         )}
       </Image>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    position: 'relative',
  },
});

export default Tree;
