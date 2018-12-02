
import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';

export default class FeedCard extends React.Component {
  constructor(props) {
    super(props)

    this.state =
      {
        liked: false,
        hand: false,
        comment: false,
        Parse:window.Parse,
        user:""
      }

  }
  componentDidMount(){
    this.getUserData();
  }
  async getUserData() {
    const user = await this.state.Parse.User.currentAsync();
    if (user) { this.setState({user: user.toJSON()}) };
 }
  ///////////////////////////////////////////////////////
  renderimage() {
   let img=this.props.data;
    // if (this.props.data.type === "FL_ITEM" || this.props.data.type === "HOTEL_ITEM") {
      return (

        <TouchableWithoutFeedback style={{ elevation: 1, height: 380 }}
        //   onPress={() => {
        //   this.props.navigate.navigate('Detail', {
        //     url: this.props.data.values.imgUrl ,textdata:this.props.data.values.stops
        //   });  
        // }}
        >
          <Image style={styles.image} resizeMode='stretch' source={{ uri: img }} />
        </TouchableWithoutFeedback>
      )
    // }
  }
  ///////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////
  pressedLike = () => {
    this.setState({
      liked: !this.state.liked
    })
  }

  ///////////////////////////////////////////////////////
  pressedhand = () => {
    this.setState({
      hand: !this.state.hand
    })
  }
  ///////////////////////////////////////////////////////
  Commentpress = () => {
    this.setState({
      comment: !this.state.comment
    })
  }
  ///////////////////////////////////////////////////////
  renderFooter() {
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity underlayColor='transparent'
          onPress={this.pressedLike}>
          <View >
            {this.state.liked ? <Icon.Ionicons style={{ marginLeft: 8 }} name="ios-heart" size={15} color="red" /> : <Icon.Ionicons style={{ marginRight: 15 }} style={{ marginLeft: 8 }} name="ios-heart-outline" size={15} color="black" />}
            {this.state.liked ? <Text style={styles.textstyle}>liked</Text> : <Text style={styles.textstyle} >like</Text>}
          </View >
        </TouchableOpacity> */}
        <TouchableOpacity underlayColor='transparent'
          onPress={this.Commentpress}>
          <View >
            {this.state.comment ? <Icon.Ionicons style={{ marginLeft: 20 }} name="ios-chatbubbles" size={15} color="red" /> : <Icon.Ionicons style={{ marginLeft: 20 }} name="ios-chatbubbles-outline" size={15} color="black" />}
            <Text style={styles.textstyle}>Comment</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity underlayColor='transparent'
          onPress={this.pressedhand}>
          <View >
            {this.state.hand ? <Icon.Ionicons style={{ marginLeft: 18 }} name="ios-hand" size={15} color="red" /> : <Icon.Ionicons style={{ marginLeft: 10 }} name="ios-hand-outline" size={15} color="black" />}
            {this.state.hand ? <Text style={styles.textstyle}>Blocked</Text> : <Text style={styles.textstyle} >Block</Text>}
          </View>
        </TouchableOpacity> */}
      </View>
    )
  }
  ///////////////////////////////////////////////////////
  rendertext() {
    let p=this.props.text;
  
    //  let g=JSON.parse(p);
    // console.log(p);
      return (
        
        <TouchableWithoutFeedback style={{  elevation: 1, height: 75 }} 
        //  onPress={() => {
        //   this.props.navigate.navigate('Detail', {
        //     url: this.props.data.values.imgUrl ,textdata:this.props.data.values.stops});     
        //   }}
        >
        {/* adjustsFontSizeToFit={true} */}
          <View>
            <Text 
              numberOfLines={3}
              allowFontScaling={true}
              style={{
                textAlignVertical: "center",
                textAlign: "left",
                color: 'black',
                fontSize: 15,
                alignSelf:"flex-start",
                marginLeft:10,
              }}>{p}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
  }
  ///////////////////////////////////////////////////////
  render() {
    // console.log(this.props.data['email']+"  king is back")
    let {Parse,user}=this.state;

    return (
      <View style={styles.root}>
        <View style={styles.topWrapper} >
          <Image source={{ uri: this.props.data}} style={styles.avatar} />
          <Text style={styles.userName}>{this.state.user.username}</Text>
        </View>
        {this.rendertext()}
        {this.renderimage()}
        {/* {this.renderFooter()} */}
        
      </View>

    );
  }

}

///////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 2,
    width: '100%',
    height: 40,
    backgroundColor: "transparent",
    borderRadius: 14,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    elevation: 4
    // flex:1
  },
  textstyle: {
    fontWeight: "bold",
    alignItems: 'center',
    marginRight: 1,
    color: "black"
  },

  root: {
    position: 'relative',
    marginTop: 7,
    paddingHorizontal: 2,
    flex: 1,
    // height: 400,
    width: Dimensions.get("window").width,
    backgroundColor: '#fff',
    alignSelf: 'center',
    // borderColor: "grey",
    // borderWidth: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
     borderColor: '#72757A',


  },
  textcontainer: {
    height: 100,
    marginBottom: 10,
    backgroundColor: "green",
    fontSize: 20,
    fontWeight: "bold"
  },
  image: {
    flex: 1,
    width: "100%",
    height: 400,
    borderRadius: 1
  },
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  topWrapper: {
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',



  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    backgroundColor: 'transparent'
  },
  actionText: {
    color: '#fff',
    fontSize: 20,
    backgroundColor: 'transparent',
    marginLeft: 10
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 18,
    borderColor: "black",
    borderWidth: 0.5,
  },
  userName: {
    marginLeft: 5,
    fontWeight: "bold"
  }
})


































































