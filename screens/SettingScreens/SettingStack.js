import {StyleSheet,Alert,View} from 'react-native';
import SettingScreen from './Setting';

import {
  createStackNavigator,
} from 'react-navigation';

const SettingApp = createStackNavigator({
  Setting: { screen: SettingScreen},
  
  
},{
  initialRouteName:'Setting'
});
SettingApp.navigationOptions={
  header:null
}

export default SettingApp;

 
