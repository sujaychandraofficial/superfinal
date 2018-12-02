import React from 'react';
import { View, FlatList, Text, StyleSheet, Animated } from 'react-native';

const data = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// class AnimatedList extends React.Component {
//   state = {
//     animatedValue: new Animated.Value(0),
//   };

//   _renderItem = ({ item }) => {
//     return (
//       <View style={styles.nonsenseItem}>
//         <Text style={styles.itemText}>{item}</Text>
//       </View>
//     );
//   };

//   render() {
//     return (
     
//     );
//   }
// }

export default class AnimatedHeader extends React.Component {
  state = {
    animatedValue: new Animated.Value(0),
  };
  static navigationOptions = {
    header: null,
    title: 'Welcome',
};
  _renderItem = ({ item }) => {
    return (
      <View style={styles.nonsenseItem}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };

  render() {
    let translateY = this.state.animatedValue.interpolate({
      inputRange: [0,90],
      outputRange: [0, -180],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  nonsenseItem: {
    backgroundColor: 'red',
    margin: 8,
  },
  itemText: {
    backgroundColor: 'blue',
    fontSize: 20,
    padding: 20,
  },
  headerWrapper: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 80,
    left: 0,
    right: 0,
  },
});