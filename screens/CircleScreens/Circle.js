import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import CardView from "../common/CardView";

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Parse: window.Parse,
      data: [],
      user:"",
    };
  }

  static navigationOptions = {
    header: null,
    title: "Welcome",
 
  };
  async componentDidMount() {
    // this.geoget()
    this.trailmethod();
  }

  async getUserData() {
    const user = await this.state.Parse.User.currentAsync();
    // console.log(user.toJSON());
    // console.log(user.username)
    if (user) {
      this.setState({ user: user.toJSON() });
    }
  }

  async trailmethod() {
    let { Parse, user } = this.state;
    this.getUserData();

    // var post=Parse.Object.extend("POST");
    // var q=new Parse.Query("POST");
    // q.equalTo("text","Sujay");
    // q.find().then((results)=>{
    //   console.log(results);
    // });
    // const distance = value;
    // const sorted = true;
    // var query = new Parse.Query("POST");
    // query.near("location", gp);
    // query.withinKilometers("location", gp,distance,sorted);
    // query.limit(5);
    //  console.log(user.username);
    // for (let i = 0; i < user.length; i++) {
    //   var object = user[i];
    //   var t = object.get("user");
    //   var l = object.get("objectId");
    //  console.log(l);
    // console.log(t);

      
    // }
    // let id=user.toString();
  
    // const GameScore = Parse.Object.extend("POST");
    const king = await this.state.Parse.User.currentAsync();
    console.log(king.get('username'));
    const query = new Parse.Query("POST");
     query.equalTo("createdBy", king);
    // const object = await query.first();

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
        console.log(results);

        this.setState({
          data: r
        });
      },
      function(error) {
        console.log(error);
      }
    );
  }

  render() {
    let { data } = this.state;
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CardView data={item.url} text={item.text} />
          )}
        />
      </View>
    );
  }
}
