import React, { Component, Fragment } from 'react';
import Loader from '../Auth/loader';
import { YellowBox,ActivityIndicator, KeyboardAvoidingView, Image, TextInput, StyleSheet, ScrollView, Text, View, DeviceEventEmitter, ImageBackground, Dimensions, AsyncStorage } from 'react-native';
import Button from "../../components/AuthButton";
 console.disableYellowBox = true;
let { height, width } = Dimensions.get("window");
export default class Login extends Component {

  constructor(props) {
    super(props);
    const { Parse } = window;
    this.state = {
      username: null,
      password: null,
      error: null,
      Parse: Parse,
      loading: false
    }
    this.doLogin = this.doLogin.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  static navigationOptions = {
    header: null
  }
  // componentWillUnmount(){
  //   return false;
  // }
  doLogin() {
    const { username, password, Parse } = this.state;

    if (username && password) {
      this.setState({ loading: false });
      let set = this;
      Parse.User.logIn(username, password).then(function (user) {
        DeviceEventEmitter.emit("userLoggedIn");
      }).then((results) => {
        // set.setState({
        //   loading:false
        //   })
      }, (error) => {
        // if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
        alert(error.message);
        set.setState({
          loading: false
        })
        // }
      });
    }

  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  signUp() {
    this.props.navigation.push('Signup', {
      Parse: this.state.Parse
    });
  }

  render() {
    let { loading } = this.state;
    //  let size=width/1.4;
    //  console.log(size);
    return (
      <View style={{ height: height }}>
        <KeyboardAvoidingView style={styles.keyboardAvoidContainer} behavior="padding">
          <ScrollView >
            <View>
              <Image source={{ uri: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg' }} style={styles.imagestyle} />
              <TextInput
                onChangeText={value => this.onChangeText('username', value)}
                style={styles.input}
                placeholder='username'
                textContentType="username"
                keyboardType="default"
                underlineColorAndroid="transparent"
              />
              <TextInput
                onChangeText={value => this.onChangeText('password', value)}
                style={styles.input}
                secureTextEntry={true}
                placeholder='password'
                textContentType="password"
                underlineColorAndroid="transparent"
              />
              {/* <Button title="Sign In" onPress={this.signIn.bind(this)} /> */}
              {/* <TextInput
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder='confirmation Code'
        /> */}
             
              {loading&&
                <ActivityIndicator color={"red"} />}
              <View >
                <Button isLoading={loading}
                  title='Login'
                  onPress={this.doLogin.bind(this)} />
                <Button isLoading={false}
                  title="signUp"
                  onPress={this.signUp.bind(this)}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
{/* <ImageBackground source={{ uri: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg'}}  style={styles.backgroundimagestyl}>
</ImageBackground> */}

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
  // container: {
  //   flex: 1,
  //   backgroundColor: 'transparent',
  //   // justifyContent: 'center',
  // },
  backgroundimagestyl: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  imagestyle: {
    width: 200,
    height: 200,
    marginLeft: width / 4,
    borderRadius: 20,
    marginTop: 50,
    borderColor: "white",
    borderWidth: 2,

  },
  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },

});


{/* <Container style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 20}}> */}
{/* <Form>
               <FormItem floatingLabel>
                  <Label>Email or Username</Label>
                  <Input autoCapitalize='none' onChangeText={(username) => this.setState({ username })} />
               </FormItem>
               <FormItem floatingLabel last>
                  <Label>Password</Label>
                  <Input onChangeText={(password) => this.setState({ password })} secureTextEntry={true} />
               </FormItem>

               <Button full primary onPress={() => this.doLogin()} style={{ paddingBottom: 4 }}>
                  <Text> Login </Text>
               </Button>
               <Button full light onPress={() => this.signUp()}><Text> Sign Up </Text></Button>
            </Form>
            {this.state.error && <Text>{JSON.stringify(this.state.error.message)}</Text>}
            <Loader loading={this.state.loading} /> */}


{/* <List>
               <ListItem>
                  <InputGroup>
                     <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                     <Input
                        autoCapitalize='none'
                        onChangeText={(username) => this.setState({ username})}
                        value={this.state.email}
                        placeholder={"Email or Username"} />
                  </InputGroup>
               </ListItem>
               <ListItem>
                  <InputGroup>
                     <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                     <Input
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder={"Password"} />
                  </InputGroup>
               </ListItem>
            </List>
            <Button full primary onPress={() => { this.doLogin()}}>
               <Text>Login</Text>
              </Button>
            <Button full onPress={() => { this.signUp()}} light>
               <Text>Sign Up</Text>
              </Button>

            {this.state.error && <Text>{JSON.stringify(this.state.error.message)}</Text>}
            <Loader loading={this.state.loading} />

         </Container> */}
