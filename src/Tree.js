import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View
} from 'react-native';
import Flake from './Flake';

// Detect screen size
const { width, height } = Dimensions.get('window');

class Tree extends Component {

  static defaultProps = {
    flakesCount: 50, // total number of flakes on the screen
  }

  render({ flakesCount } = this.props) {
    return <View style={styles.container}>
      {/* Christmas Tree background image */}
      <Image
        style={styles.image}
        source={require('./tree.jpg')}
      >
        {/* Render flakesCount number of flakes */}
        {[...Array(flakesCount)].map((_, index) => <Flake
            x={Math.random() * width}               // x-coordinate
            y={Math.random() * height}              // y-coordinate
            radius={Math.random() * 4 + 1}          // radius
            density={Math.random() * flakesCount}   // density
            key={index}
          />)}
      </Image>
    </View>;
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
