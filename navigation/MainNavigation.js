import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeStackScreen from '../screens/HomeScreens/HomeStack';
// import TrendStackScreen from '../screens/TrendScreens/TrendStack';
import CircleStackScreen from '../screens/CircleScreens/CircleStack';
import SettingStackScreen from '../screens/SettingScreens/SettingStack';

const HomeStack=createStackNavigator({
    Home:HomeStackScreen,
});

HomeStack.navigationOptions={
    tabBarOptions: { activeTintColor:'black', },
    tabBarLabel:"Home",
    tabBarIcon:({focused})=>(
      <TabBarIcon
         focused={focused}
         name={
             Platform.OS==='ios'
             ?`ios-home${focused ?'' : '-outline'}`
             :'md-home'
         }
         
      />
    ),
    
};

// const TrendStack=createStackNavigator({
//     Trend:TrendStackScreen,
// });

// TrendStack.navigationOptions={
//     tabBarOptions: { activeTintColor:'black', },
//     tabBarLabel:"Trend",
//     tabBarIcon:({focused})=>(
//       <TabBarIcon
//          focused={focused}
//          name={
//              Platform.OS==='ios'
//              ?`ios-compass${focused ?'' : '-outline'}`
//              :'ios-compass'
//          }
//       />
//     ),
// }

const CircleStack=createStackNavigator({
    Circle:CircleStackScreen,
});

CircleStack.navigationOptions={
    tabBarOptions: { activeTintColor:'black', },
    tabBarLabel:"Circle",
    tabBarIcon:({focused})=>(
      <TabBarIcon
         focused={focused}
         name={
             Platform.OS==='ios'
             ?`ios-planet${focused ?'' : '-outline'}`
             :'ios-planet'
         }
      />
    ),
}

const SettingStack=createStackNavigator({
   Setting:SettingStackScreen,
});

SettingStack.navigationOptions={
    tabBarOptions: { activeTintColor:'black', },
    tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` 
      : 'md-options'}
    />
  ),
}

export default createBottomTabNavigator({
    HomeStack,
    // TrendStack,
    CircleStack,
    SettingStack,
  });
  