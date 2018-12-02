import React, { Component, Fragment } from 'react';
import { AsyncStorage, DeviceEventEmitter ,Icon,Text,StyleSheet,Dimensions,View} from 'react-native';
import Button from "../../components/AuthButton";
let { height, width } = Dimensions.get("window");

// import { Container, Button, Icon, Text } from 'native-base';

const LogoTitle = (props) => {
   return <Text>Topo</Text>
}

export default class Setting extends Component {

   constructor(props) {
      super(props);
      this.state = {
         Parse: window.Parse,
         user: null
      }
   }

   componentDidMount() {
      this.getUserData();
   }
  //  componentWillUnmount(){
  //    DeviceEventEmitter.removeAllListenter();
  //  }
   async getUserData() {
      const user = await this.state.Parse.User.currentAsync();
      if (user) { this.setState({user: user.toJSON()}) };
   }

   static navigationOptions = ({ navigation }) => {
      doLogout = async () => {
        //  try {
        //     const logout = await Parse.User.logOut();
        //     DeviceEventEmitter.emit('userLoggedOut');
        //  } catch (error) {
        //     alert('Erro ao fazer logout...');
        //  }
       await Parse.User.logOut().then(function (user) {
          DeviceEventEmitter.emit('userLoggedOut');


    }).then((results) => {
          // set.setState({
          //       loading: false
          // })

    }, (error) => {
          alert(error.message);
          // set.setState({
          //       loading: false
          // })
    });
      }

      return {
         headerTitle: <LogoTitle />,
         headerRight: (
            <View style={styles.buttonstyle}>
                                    <Button title=" logout" onPress={() => { this.doLogout() }} />
                              </View>
         )
      }
   };

   render() {
      return (
         <Fragment>
            {this.state.user && <Text>Username: {this.state.user.username }</Text>}
         </Fragment>
      );
   }
}
 {/* <Button onPress={() => doLogout()} transparent>
               <Icon name='log-out' />
            </Button> */}
            const styles = StyleSheet.create({
             
              buttonstyle: {
                    margin: 10,
                    padding: 10,
        
              },
            
        });