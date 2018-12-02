import {StyleSheet,Alert,View} from 'react-native';
import TrendScreen from './Trend';

import {
  createStackNavigator,
} from 'react-navigation';

const TrendApp = createStackNavigator({
  Trend: { screen: TrendScreen},
  
},{
  initialRouteName:'Trend'
});
TrendApp.navigationOptions={
  header:null
}
export default TrendApp;

 
