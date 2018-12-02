import {StyleSheet,Alert,View} from 'react-native';
import CreateScreen from './CreateFeed';
import HomeScreen from './Home';
import LiveScreen from './HotLive';
// import DetailScreen from './Detail';

import {
  createStackNavigator,
} from 'react-navigation';

const HomeApp = createStackNavigator({
  Home: { screen: HomeScreen},
  // Create: { screen: CreateScreen },
  Live:{screen:LiveScreen},
  // Detail:{screen:DetailScreen}
  
},{
  initialRouteName:'Home'
});
HomeApp.navigationOptions={
  header:null
}

export default HomeApp;

 
