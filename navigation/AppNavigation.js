// import React from 'react';
// import {
//   ActivityIndicator,
//   AsyncStorage,
//   Button,
//   StatusBar,
//   StyleSheet,
//   View,
// } from 'react-native';
// import Main from './MainNavigation';

// import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

// class SignInScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Please sign in',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Sign in!" onPress={this._signInAsync} />
//       </View>
//     );
//   }

//   _signInAsync = async () => {
//     await AsyncStorage.setItem('userToken', 'abc');
//     this.props.navigation.navigate('App');
//   };
// }

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome to the app!',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Show me more of the app" onPress={this._showMoreApp} />
//         <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
//       </View>
//     );
//   }

//   _showMoreApp = () => {
//     this.props.navigation.navigate('Other');
//   };

//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
// }

// class OtherScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Lots of features here',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }

//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
// }

// class AuthLoadingScreen extends React.Component {
//   constructor() {
//     super();
//     this._bootstrapAsync();
//   }

//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');

//     // This will switch to the App screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//   };

//   // Render any loading content that you like here
//   render() {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const AppStack = createStackNavigator({ Home: HomeScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

// export default createSwitchNavigator(
//   {
//     AuthLoading: AuthLoadingScreen,
//     App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   }
// );


















import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../navigation/Auth/AuthLoadingScreen';
import Login from '../navigation/Auth/Login';
import Signup from '../navigation/Auth/Signup';
import Main from './MainNavigation';

const AuthStackNav = createStackNavigator({
   Login: Login,
   Signup: Signup
});

const MainStackNav = createStackNavigator({
   Main: Main
},{navigationOptions:{
  header:null
}});

export default createSwitchNavigator({
   AuthLoading: AuthLoadingScreen,
   Auth: AuthStackNav,
   Main: MainStackNav
}, {
      initialRouteName: 'AuthLoading'
   });

   




























// import React from  'react';
// import { createSwitchNavigator } from 'react-navigation';

// import MainTabNavigator from './MainNavigation';
// import AuthTabs from '../Auth/Tabs';
// var Parse = require('parse/react-native');
// // var AsyncStorage = require('react-native').AsyncStorage;
// // Parse.setAsyncStorage(AsyncStorage);
// if(true){
// p=AuthTabs;
// }else{
// p= MainTabNavigator;
// }
// Parse.initialize("DoZA0RvTXK4bj5YgDAtQi9OghObMmUkyiuavczRd", "QLARiylsTlTImCrMeMsVGsCbRo3FYLWVeqMykrwP");
// Parse.serverURL = 'https://parseapi.back4app.com/';
// const user =  Parse.User.currentAsync();
// console.log(user);
// export default createSwitchNavigator({

//     // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//  main:user?AuthTabs:AuthTabs
// });




