import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Modal,
  Alert,
  Slider
} from "react-native";
// import data from "../common/flightdata";
import CardView from "../common/CardView";
import { Icon, Permissions, Location } from "expo";
import AddModal from "./CreateFeed";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const fakeUrl =
  "https://images-na.ssl-images-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg";

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Parse: window.Parse,
      lattitude: 31.2691493,
      longitude: 75.6929291,
      data: [],
      value:1
    };
    this.addfedds = this.addfedds.bind(this);
  }
  addfedds = () => {
    this.refs.addModal.showAddModal();
  };
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    // this.geoget()
  this.trailmethod();

  }   
  async geoget(){
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
    //  try{
      //  if((image1!=null)|(text.length>2)){
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      this.setState({ longitude, latitude });
    }
      this.trailmethod();

  }
  async  trailmethod() {
    let { Parse, lattitude, longitude, data ,value} = this.state;
    
    let gp = new Parse.GeoPoint({
      latitude: lattitude,
      longitude: longitude
    });
    // var post=Parse.Object.extend("POST");
    // var q=new Parse.Query("POST");
    // q.equalTo("text","Sujay");
    // q.find().then((results)=>{
    //   console.log(results);
    // });
    const distance = value;
    const sorted = true;
    var query = new Parse.Query("POST");
    query.near("location", gp);
    // query.withinKilometers("location", gp,distance,sorted);
    // query.limit(5);
   await query.find().then(
      results => {
        // let k = results;
        let a = [];
        let q = [];
        let r = [];
        for (let i = 0; i < results.length; i++) {
          var object = results[i];
          var t = object.get("text");
          var l = object.get("img1");
          a.push(l._url);
          q.push(t);
          r.push({ text: t, url: l._url });
        }
        // console.log(results);

        this.setState({
          data: r,
        });
      },
      function(error) {
        console.log(error);
      }
    );

    Alert.alert(lattitude + "  " + longitude);
  };
  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }


  render() {
    let { data,value} = this.state;
    // console.log('hello');
    return (
      <View>
        <View style={styles.headercotainer}>
          <View style={styles.headerow}>
            <Image
              source={require("../../assets/images/q.png")}
              style={styles.headerLeft}
            />
            <Text
              style={{
                marginLeft: 60,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
                fontFamily: "space-mono",
                color: "white"
              }}
            >
              Gotcha
            </Text>
            <View style={{ flexDirection: "row" }}>
              {/* <Icon.Ionicons
                style={styles.magnetStyle}
                name="ios-magnet-outline"
                size={36}
                color="white"
              /> */}
              <Icon.Ionicons
                style={styles.createfeedstyle}
                name="ios-add-circle-outline"
                size={36}
                color="white"
                onPress={this.addfedds}
              />
            </View>
          </View>
        </View>
        {/* <Text>{data}</Text> */}
        {/* <Slider
          step={1}
          maximumValue={10}
          onValueChange={this.change.bind(this)}
          value={value}
        /> */}
        <View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CardView data={item.url} text={item.text} />
            )}
          />
        </View>
        <AddModal ref={"addModal"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headercotainer: {
    marginTop: 0,
    backgroundColor: "white",
    height: 75,
    elevation: 4
  },
  headerow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 1,
    backgroundColor: "#1e88e5"
  },
  headerLeft: {
    height: 45,
    width: 50,
    borderRadius: 2,
    borderColor: "white",
    borderWidth: 0.5,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10
  },
  magnetStyle: {
    marginRight: 15,
    marginTop: 20
  },
  createfeedstyle: {
    marginRight: 10,
    marginTop: 20
  }
});

// let { Parse, latitude, longitude } = this.state;
// const { status } = await Permissions.askAsync(Permissions.LOCATION);
// if (status === "granted") {
//   const {
//     coords: { latitude, longitude }
//   } = await Location.getCurrentPositionAsync();
//   this.setState({ longitude, latitude });
//   Alert.alert("" + latitude + "    " + longitude);
//   console.log("" + longitude + "" + latitude);
