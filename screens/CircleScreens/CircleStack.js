import {StyleSheet,Alert,View} from 'react-native';
import CircleScreen from './Circle';

import {
  createStackNavigator,
} from 'react-navigation';

const CircleApp = createStackNavigator({
  Circle: { screen: CircleScreen},
  
  
},{
  initialRouteName:'Circle'
});
CircleApp.navigationOptions={
  header:null
}

export default CircleApp;

 
