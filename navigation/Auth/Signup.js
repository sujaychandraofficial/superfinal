import React, { Component, Fragment } from 'react';
import Loader from '../Auth/loader';
import { TextInput, KeyboardAvoidingView, StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import Button from "../../components/AuthButton";
let { height, width } = Dimensions.get("window");



export default class Signup extends Component {

      constructor(props) {
            super(props);
            const { Parse } = window;
            this.state = {
                  username: null,
                  password: null,
                  email: null,
                  phone: null,
                  Parse: Parse,
                  error: null,
                  isloading: false,

            }
      }
      onChangeText(key, value) {
            this.setState({
                  [key]: value
            })
      }
      doSignIn() {
            const { username, password, email, phone, Parse, } = this.state;
            let nani = this.props.navigation;
            let set = this;
            if (username && password && email && phone) {
                  //    this.setState({ loading: true });
                  const user = new Parse.User();
                  user.set("username", username);
                  user.set("password", password);
                  user.set("email", email);
                  user.set("phone",phone);

                  let changeset = this.setState({ loading: true });
                  user.signUp().then(function (user) {
                        nani.navigate('Login');;

                  }).then((results) => {
                        set.setState({
                              loading: false
                        })

                  }, (error) => {
                        alert(error.message);
                        set.setState({
                              loading: false
                        })
                  });
            }

      }

      render() {
            let {isloading} =this.state;
            return (
                  <View style={{ height: height }}>
                        <KeyboardAvoidingView style={styles.keyboardAvoidContainer} behavior="padding">
                              <ScrollView>
                                    <View >
                                    {/* <Image source={{ uri: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg' }} style={styles.imagestyle} /> */}
                                          <TextInput
                                                onChangeText={value => this.onChangeText('username', value)}
                                                style={styles.input}
                                                placeholder='username'
                                                textContentType="username"
                                                underlineColorAndroid="transparent"/>
                                          <TextInput
                                                onChangeText={value => this.onChangeText('password', value)}
                                                style={styles.input}
                                                secureTextEntry={true}
                                                placeholder='password'
                                                underlineColorAndroid="transparent"/>
                                          {/* <TextInput
          onChangeText={value => this.onChangeText('phone_number', value)}
          style={styles.input}
          placeholder='phone'
        /> */}
                                          <TextInput
                                                onChangeText={value => this.onChangeText('email', value)}
                                                style={styles.input}
                                                placeholder='email'
                                                textContentType="emailAddress"
                                                underlineColorAndroid="transparent"/>
                                          <TextInput
                                                onChangeText={value => this.onChangeText('phone', value)}
                                                style={styles.input}
                                                placeholder='phone'
                                                textContentType="telephoneNumber"
                                                underlineColorAndroid="transparent"/>
                                          <View >
                                                <Button title="Sign Up" 
                                                onPress={() => { this.doSignIn() }} 
                                                isLoading={isloading}/>
                                          </View>
                                          {/* <Loader loading={this.state.loading} /> */}

                                          {/* <Button title="Confirm Sign Up" onPress={this.confirmSignUp.bind(this)} /> */}
                                    </View>
                              </ScrollView>
                        </KeyboardAvoidingView>
                  </View>
            );
      }
}

const styles = StyleSheet.create({
      input: {
            height: 50,
            // borderBottomWidth: 2,
            // borderBottomColor: '#fff',
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            backgroundColor: "#fff",
            // borderColor:"black",
            // borderWidth:0.5,
            elevation: 10,
            textAlign: "center",
            borderWidth: 0.5,
            borderColor: "black",
            borderRadius: 20,
      },
      buttonstyle: {
            margin: 10,
            padding: 10,
          
      },
      imagestyle: {
            width: 200,
            height: 200,
            marginLeft: width / 3.5,
            borderRadius: 20,
            marginTop: 20,
            borderColor: "white",
            borderWidth: 2,

      }, keyboardAvoidContainer: {
            flex: 1,
            backgroundColor: '#fff'
      },


});