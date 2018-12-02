import React, { Component } from 'react';
import {
  Text, View, Modal, Dimensions, Alert, Image, ImageBackground,
  TouchableOpacity, StyleSheet, TextInput, Keyboard, ScrollView,
  KeyboardAvoidingView,Platform
} from 'react-native';
import { Icon, ImagePicker, Video, Permissions, Camera, Constants,Location,FileSystem } from 'expo';
import Expo from 'expo';
// 

import VideoPlayer from '@expo/videoplayer';
// import base64 from 'base64-js';

let { width, height } = Dimensions.get('window');


export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      visibleHeight: Dimensions.get('window').height,
      k_visible: false,
      text: "",
      image1: null,
      image1base64:null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
      image6: null,
      image7: null,
      image8: null,
      image9: null,
      image10: null,
      startcam: false,
      startphoto: false,
      // shouldplays1: false,
      // shouldplays2: false,
      // shouldplays3: false,
      // muted1: false,
      // muted2: false,
      // muted3: false,
      video1: null,
      video1base64:null,
      video2: null,
      video3: null,
      permissionsGranted: false,
      flash: Camera.Constants.FlashMode.off,
      zoom: 0,
      autoFocus: 'on',
      depth: 0,
      type: Camera.Constants.Type.back,
      whiteBalance: 'auto',
      ratio: '16:9',
      Parse:window.Parse,
     locationstatus:false,
     errorMessage:'',
     location:0,
     latitude:0, 
     longitude:0
    }
  }
  ////////////////for showing modal//////////////////
  ////////////////for showing modal//////////////////
  showAddModal = () => {
    this.setState({
      modalVisible: true
    });
    // this.refs.myModal.open()
  }

  hideModal=()=>{
    this.setState({
      modalVisible: false
    });
  }
  ////////////////for showing modal//////////////////
  // trailmethod=()=>{
  //   let {Parse}=this.state;
  //   var point = new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});
  //   Parse.geodata.set("location", point)
  //   // placeObject.set("location", point);


  // }
  ////////////////for showing modal//////////////////


  async componentDidMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  
     
    } 
  

  componentWillUnmount() {
    Keyboard.removeListener('keyboardWillShow');
    Keyboard.removeListener('keyboardWillHide');
    
  }

  keyboardWillShow(e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height
    this.setState({ visibleHeight: newSize, k_visible: true })
  }

  keyboardWillHide(e) {
    if (this.componentDidMount) {
      this.setState({ visibleHeight: Dimensions.get('window').height, k_visible: false })
    }

  }
  //////listener for keyboard popup///////////////////
  //////listener for keyboard popup///////////////////
post=()=>{  
  if (Platform.OS === 'android' && !Constants.isDevice) {
  this.setState({
    errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
  });
} else {
  //  this._getLocationAsync();
   this.trailmethod();
}
 }
  trailmethod=()=>{
   let {Parse,latitude,longitude,image1,text,image1base64,video1base64,video1}=this.state;
   var user=Parse.User.current();
  
   var Post =Parse.Object.extend("POST");
   var post=new Post();
   post.set("text",text);
   post.set("createdBy",user);
   var point = new Parse.GeoPoint({latitude, longitude});
   post.set("location",point);
   var file = new Parse.File("myfile.jpg",{base64: image1base64});
   post.set("img1",file);
  //  var file2=new Parse.File("myfile.mp4",{base64:video1base64});
  //  post.set("video1",file2);
   post.save().then((post)=>{
     console.log("sucessfully saved text to server"+post.id);
     this.setState({
          text:"",
          image1:null,
          image1base64:null,
          video:null,
          video1base64:null,
        })
   },(error)=>{
     console.log(err.message+"");   
   });
  //   {sucess:function(obj){
  //    console.log("sucessfully saved text to server"+obj.id);
  //    this.setState({
  //     text:"",
  //   })
  //  },error:function(obj,err){
  //   console.log(err+"");
  //  }})
   
  }
 _getLocationAsync = async () => {
   
   let {parse,latitude,longitude,image1,text}=this.state;
   const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
      //  try{
        //  if((image1!=null)|(text.length>2)){
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
        this.setState({ longitude, latitude });
        Alert.alert(""+latitude+"    "+longitude);
        console.log(""+longitude+""+latitude)
         this.trailmethod();
        
        // var file=new parse.File("myimage");
        // parse.user.set(file,image1);

        //  parse.save();
        
      // }else{

      // }
      //  }catch(e){
        // alert("on location services");
      //  }
      } else {
        alert("We couldn't get your location");
      }
 
};
  /////////////////header in the feed///////////////////////////
  /////////////////header in the feed///////////////////////////
  renderheader() {
    return (
      <View style={styles.headercotainer}>
        <View style={styles.headerow}>
          <Icon.Ionicons style={styles.headerLeft} name="ios-close" size={60} color="black" onPress={this.hideModal} />
          <Text style={styles.headertext}>New Feed</Text>
          <Icon.Ionicons style={styles.headerRight} name="ios-checkmark" size={60} color="black" onPress={this.post} />

        </View>
      </View>
    );
  }
  /////////////////header in the feed///////////////////////////
  /////////////////header in the feed///////////////////////////
  //////////////////exitmethod//////////////////////////////////
  // exitmethod(){
  //   let {king} =this;
  //    Alert.alert(
  //   'Alert Title',
  //   'My Alert Msg',
  //   [
  //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  //     {text: 'OK', onPress:()=>{king.hideModal}},
  //   ],
  //   { cancelable: false }
  //   )
  // }
  //////////////////exitmethod//////////////////////////////////

  /////////////////for writing in the feed///////////////////////////
  /////////////////for writing in the feed///////////////////////////
  renderText() {
    return (
      <View style={{
        padding: 16,
        // backgroundColor: this.state.text,
        borderBottomColor: '#fff',
        borderBottomWidth: 1
      }}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          // fontSize={}
          // allowFontScaling={true}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          editable={true}
          fontSize={20}          
          maxLength={600}
          underlineColorAndroid="transparent"
          placeholderTextColor={'gray'} placeholder={"What's on your mind?"}
        />
      </View>
    )
  }
  /////////////////for writing in the feed///////////////////////////
  /////////////////for writing in the feed///////////////////////////

  /////////////////image picking///////////////////////////
  /////////////////image picking///////////////////////////

  _pickImage = async () => {
    let { image1,image1base64, image2, image3, image4, image5, image6, image7, image8, image9, image10 } = this.state;
    if (image10 !== null) {
      Alert.alert("sorry only 10 images for post");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [7, 10],
        quality: 0.5,
        base64: true
      });

      console.log(result);

      if (!result.cancelled) {
        console.log(result.base64);

        if (!image1) {
          this.setState({
            image1: result.uri,
            image1base64:result.base64
          });
        } else if (!image2) {
          this.setState({
            image2: result.uri
          });
        } else if (!image3) {
          this.setState({
            image3: result.uri
          });
        } else if (!image4) {
          this.setState({
            image4: result.uri
          });
        } else if (!image5) {
          this.setState({
            image5: result.uri
          });
        } else if (!image6) {
          this.setState({
            image6: result.uri
          });
        } else if (!image7) {
          this.setState({
            image7: result.uri
          });
        } else if (!image8) {
          this.setState({
            image8: result.uri
          });
        } else if (!image9) {
          this.setState({
            image9: result.uri
          });
        } else if (!image10) {
          this.setState({
            image10: result.uri
          });
        }
      }
    }
  };
  /////////////////image picking///////////////////////////
  /////////////////image picking///////////////////////////
  /////////////////video pick/////////////////////////////
  // _pickVideo = async () => {
  //   let { video1 } = this.state;

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     // allowsEditing: true,
  //     type:'video',
  //     // mediaTypes: 'video',
  //     // allowsEditing:true
  //   });

  //   console.log(result);
  //   if (!result.cancelled) {
  //     if (!video1) {
  //       this.setState({
  //         video1: result.uri
  //       });
  //     }
  //   }
  // };


  /////////////////video pick/////////////////////////////
  ////////////////////Selected videos for posting////////////
  // renderVideo(video1) {
  //   return (
  //     <View>
  //       {video1 &&
  //         <Video
  //         // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
  //           source={{ uri: video1 }}
  //           rate={1.0}
  //           volume={1.0}
  //           isMuted={false}
  //           resizeMode="cover"
  //           // shouldPlay
  //           // isLooping
  //           style={{ width: 300, height: 300 }}
  //         ></Video>}
  //     </View>
  //   )
  // }

  ////////////////////Selected videos for posting////////////
  ////////////////////Selected videos for posting////////////


  /////////////////seleted images for posting///////////////////////////
  /////////////////seleted images for posting///////////////////////////

  renderImage({ image1, image2, image3, image4, image5, image6, image7, image8, image9, image10 }) {
    return (
      <View>

        {image1 &&
          <ImageBackground source={{ uri: image1 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={30} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image1: null }) }} />
          </ImageBackground>}
        {image2 &&
          <ImageBackground source={{ uri: image2 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={60} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image2: null }) }} />
          </ImageBackground>}
        {image3 &&
          <ImageBackground source={{ uri: image3 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={60} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image3: null }) }} />
          </ImageBackground>}
        {image4 &&
          <ImageBackground source={{ uri: image4 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={60} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image4: null }) }} />
          </ImageBackground>}
        {image5 &&
          <ImageBackground source={{ uri: image5 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={60} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image5: null }) }} />
          </ImageBackground>}
        {image6 &&
          <ImageBackground source={{ uri: image6 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={60} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image6: null }) }} />
          </ImageBackground>}
        {image7 &&
          <ImageBackground source={{ uri: image7 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={60} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image7: null }) }} />
          </ImageBackground>}
        {image8 &&
          <ImageBackground source={{ uri: image8 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={60} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image8: null }) }} />
          </ImageBackground>}
        {image9 &&
          <ImageBackground source={{ uri: image9 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={60} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image9: null }) }} />
          </ImageBackground>}
        {image10 &&
          <ImageBackground source={{ uri: image10 }} style={styles.imagebackgroundstyle}>
            <Icon.Ionicons name="ios-close" size={60} color="blue" style={styles.closeicon} onPress={() => { this.setState({ image10: null }) }} />
          </ImageBackground>}
      </View>
    )

  }
  /////////////////seleted images for posting///////////////////////////
  /////////////////seleted images for posting///////////////////////////

  /////////////////menu icons///////////////////////////
  /////////////////menu icons///////////////////////////

  renderMenu() {
    // const {k_visible} = this.state;
    // if(k_visible) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => { Keyboard.dismiss() }}
          style={{
            margin: 5, height: 56, borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#72757A',
            flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5
          }}>
          <Text style={{ color: "black", fontSize: 16, padding: 5, fontWeight: '500' }}>Add to your post</Text>
          <View style={{ flexDirection: 'row', paddingRight: 16, justifyContent: 'space-evenly' }}>
            <Icon.Ionicons style={styles.icon} name='ios-image' color='black' size={34} onPress={this._pickImage} />
            <Icon.Ionicons style={styles.icon} name='ios-camera' color='black' size={34} onPress={this.startphotocam} />
            {/* <Icon.Ionicons style={styles.icon} name='ios-videocam' color='black' size={34} onPress={this.startvideocam} /> */}
            {/* <Icon.Ionicons style={styles.icon} name='md-pin' color='#D8396F' size={24}  /> */}
            {/* <Icon.Ionicons style={styles.icon} name='ios-happy' color='black' size={34} /> */}

          </View>
        </TouchableOpacity>
      </View>
    )
    // }
  }
  /////////////////menu icons///////////////////////////
  /////////////////menu icons///////////////////////////

  //////////////////images from camera///////////////////////
  //////////////////images from camera///////////////////////

  // _launchCameraAsync = async () => {
  //   // const {hasCameraPermission}=this.state;
  //   let { status } = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);
  //   if (status !== 'granted') {
  //     console.log("Camera perms not granted");
  //     return;
  //   }
  //   let { image10 } = this.state;

  //   if (image10 !== null) {
  //     Alert.alert("sorry only 10 images for post");
  //   } else {

  //     let img1 = await Expo.ImagePicker.launchCameraAsync({
  //       allowsEditing: true,
  //       quality: 0.5,
  //       base64: true,
  //       exif: true
  //     });
  //     // let manipResult = await Expo.ImageManipulator.manipulate(
  //     //  img1,
  //     //   [{ rotate: 90}, { flip: { horizontal: false }}],
  //     // );
  //     //  let k=JSON.stringify(img1)
  //     console.log(img1);
  //     this.setcameraimage(img1)
  //   }

  // }
  snap = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.log("Camera perms not granted");
      return;
    }
    let { image10 } = this.state;

    if (this.camera2) {
      if (image10 !== null) {
        this.stopRecording();
        Alert.alert("sorry only 10 images for post");
      } else {

        let photo = await this.camera2.takePictureAsync({
          base64: true
        });
        console.log(photo)
      
        this.setcameraimage(photo)
        console.log(photo.base64);

      }
    }
  };
  setcameraimage(imag1) {
    let { image1,image1base64, image2, image3, image4, image5, image6, image7, image8, image9, image10, video1 } = this.state;
    if (!image1) {
      this.setState({
        image1: imag1.uri,
        image1base64:imag1.base64,
      });
    } else if (!image2) {
      this.setState({
        image2: imag1.uri
      });
    } else if (!image3) {
      this.setState({
        image3: imag1.uri
      });
    } else if (!image4) {
      this.setState({
        image4: imag1.uri
      });
    } else if (!image5) {
      this.setState({
        image5: imag1.uri
      });
    } else if (!image6) {
      this.setState({
        image6: imag1.uri
      });
    } else if (!image7) {
      this.setState({
        image7: imag1.uri
      });
    } else if (!image8) {
      this.setState({
        image8: imag1.uri
      });
    } else if (!image9) {
      this.setState({
        image9: imag1.uri
      });
    } else if (!image10) {
      this.setState({
        image10: imag1.uri
      });
    }

  }

  //////////////////images from camera///////////////////////
  //////////////////images from camera///////////////////////
  //////////////video for post//////////////////////////////
  async componentWillMount() {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const audioPermission = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const photoStatus = cameraPermission.status
    const videoStatus = audioPermission.status
    this.setState({ permissionsGranted: photoStatus === 'granted' && videoStatus === 'granted' });
  }


  startRecording = async function () {
    this.refs._scrollView.scrollTo({ y: 0 });

    let recordingConfig = {
      quality: Camera.Constants.VideoQuality['480p'],
      maxDuration: 5 * 2,
      // base64:true
    }

    if (this.camera) {
      this.camera.recordAsync(recordingConfig).then(async data => {
        console.log(data.uri)
        // Vibration.vibrate();
        // let saveResult = await CameraRoll.saveToCameraRoll(data.uri);
        // this.state.videos.push(
        //   {
        //     uri:data.uri,
        //     fs:`${FileSystem.documentDirectory}videos/Video_${this.state.recordingId}.mov`,
        //     rollUri:saveResult
        //   })
        // this.state.recordingId = this.state.recordingId + 1
        // let { video3 } = this.state;
        // if (video3 !== null) {
        //   Alert.alert("only three videos for post");

        // } else {
          let p=fileToBase64(data.uri);
          
        this.setthevideos(data,p);
         console.log(p);
        // }

      });
    }
  }
//   async fileToBase64(uri: string) {
//     try {
//         const content = await FileSystem.readAsStringAsync(uri)
//         return base64.fromByteArray(stringToUint8Array(content))
//     } catch(e) {
//         console.warn('fileToBase64()', e.message)
//         return ''
//     }
// }
  setthevideos = (data,p) => {
    let { video1,video1base64, video2, video3 } = this.state;
    if (!video1) {
      this.setState({
        video1: data.uri,
        video1base64:p,

      })
    } else if (!video2) {
      this.setState({
        video2: data.uri
      })
    } else if (!video3) {
      this.setState({
        video3: data.uri
      })
    }
  }
  pastethevideos = (video1, video2, video3) => {
    return (
      <View>

        {video1 &&
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Icon.Ionicons style={{ marginLeft: width / 1.1 }} name="ios-close" size={30} color="black" onPress={() => { this.setState({ video1: null }) }} />

            </View>
            <VideoPlayer
              videoProps={{
                shouldPlay: false,
                rate: 1.0,
                shouldCorrectPitch: true,
                positionMillis: 0,
                volume: 1.0,
                isLooping: false,
                isMuted: false,
                showFullscreenButton: false,
                resizeMode: Video.RESIZE_MODE_COVER,
                source: {
                  uri: video1,
                },
              }}
            />
          </View>
        }
        <View>
          {video2 &&
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Icon.Ionicons style={{ marginLeft: width / 1.1 }} name="ios-close" size={30} color="black" onPress={() => { this.setState({ video2: null }) }} />

              </View>
              <VideoPlayer
                videoProps={{
                  shouldPlay: false,
                  rate: 1.0,
                  shouldCorrectPitch: true,
                  positionMillis: 0,
                  volume: 1.0,
                  isLooping: false,
                  isMuted: false,
                  showFullscreenButton: false,
                  resizeMode: Video.RESIZE_MODE_COVER,
                  source: {
                    uri: video2,
                  },
                }}
              />
            </View>}
        </View>
        {video3 &&
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Icon.Ionicons style={{ marginLeft: width / 1.1 }} name="ios-close" size={30} color="black" onPress={() => { this.setState({ video3: null }) }} />

            </View>
            <VideoPlayer
              videoProps={{
                shouldPlay: false,
                rate: 1.0,
                shouldCorrectPitch: true,
                positionMillis: 0,
                volume: 1.0,
                isLooping: false,
                isMuted: false,
                showFullscreenButton: false,
                resizeMode: Video.RESIZE_MODE_COVER,
                source: {
                  uri: video3,
                },
              }}
            />
          </View>}
      </View>
    )

  }

  stopRecording() {
    if (this.camera) {
      this.camera.stopRecording()
    }
    // if(this.camera2){
    //   this.camera2.stopRecording()
    // }
    this.setState({
      startcam: false,
      startphoto: false
    })
  }

  renderNoPermissions() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Text style={{ color: 'white' }}>
          Camera permissions not granted - cannot open camera preview.
        </Text>
      </View>
    );
  }

  renderCamera() {
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          //  flex: 1,
          height: 570,
          width: Dimensions.get('window').width
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        captureAudio={true}>
        <View>
          <TouchableOpacity onPress={this.stopRecording.bind(this)} style={{ marginLeft: width / 1.1 }}>
            <Icon.Ionicons name="ios-close" size={60} color="white" onPress={this.stopRecording.bind(this)} />

          </TouchableOpacity>
        </View>
        <View
          style={{
            // flex: 0.5,
            backgroundColor: 'transparent',
            // color: "white",
            flexDirection: 'row',
            justifyContent: 'space-around',
            // paddingTop: Constants.statusBarHeight / 2,
          }}>

          <TouchableOpacity onPress={() => {
            this.setState({
              type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
            });
          }} style={{ marginTop: 400 }}>
            {/* <Text style={styles.flipText}> Record </Text> */}

            <Icon.Ionicons name='ios-reverse-camera' color='white' size={50} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => {
            this.setState({
              flash: this.state.flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off,
            });
          }} style={{ marginTop: 400 }}>

            <Icon.Ionicons name='md-flash' color='#EDC370' size={40} />
          </TouchableOpacity> */}

          <View style={{ flexDirection: 'column' }}>

            <TouchableOpacity onPressIn={this.startRecording.bind(this)} onPressOut={this.stopRecording.bind(this)} style={[styles.recordButton]}>
              {/* <Icon.Ionicons name='md-disc' color='red' size={130} /> */}
            </TouchableOpacity>
            <Text style={{ color: "#fff", margin: 10 }}>Long press to record video</Text>
          </View>
          {/* <TouchableOpacity onPress={() => {
            this.setState({
              whiteBalance: wbOrder[this.state.whiteBalance]
            })
          }}>
            <Icon.Ionicons  name='ios-color-wand' color='#EDC370' size={40} />
          </TouchableOpacity> */}
          <View style={{ flexDirection: 'row', marginTop: 400 }}>
            <TouchableOpacity onPress={() => {
              this.setState({ zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1 });
            }} style={{ marginRight: 20 }}>
              <Icon.Ionicons name='ios-add-circle' color='white' size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({ zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1 });
            }}>
              <Icon.Ionicons name='ios-remove-circle' color='white' size={50} />
            </TouchableOpacity>
          </View>
        </View>



      </Camera>

    );
  }


  renderCamera2() {
    return (
      <Camera
        ref={ref => {
          this.camera2 = ref;
        }}
        style={{
          //  flex: 1,
          height: 570,
          width: Dimensions.get('window').width
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        captureAudio={true}>
        <View>
          <TouchableOpacity onPress={this.stopRecording.bind(this)} style={{ marginLeft: width / 1.1 }}>
            <Icon.Ionicons name="ios-close" size={60} color="white" onPress={this.stopRecording.bind(this)} />

          </TouchableOpacity>
        </View>
        <View
          style={{
            // flex: 0.5,
            backgroundColor: 'transparent',
            // color: "white",
            flexDirection: 'row',
            justifyContent: 'space-around',
            // paddingTop: Constants.statusBarHeight / 2,
          }}>

          <TouchableOpacity onPress={() => {
            this.setState({
              type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
            });
          }} style={{ marginTop: 400 }}>
            {/* <Text style={styles.flipText}> Record </Text> */}

            <Icon.Ionicons name='ios-reverse-camera' color='white' size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({
              flash: this.state.flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off,
            });
          }} style={{ marginTop: 400 }}>

            <Icon.Ionicons name='md-flash' color='white' size={50} />
          </TouchableOpacity>

          {/* <View style={{ flexDirection: 'column', marginTop: 345 }}>
           */}
          <TouchableOpacity onPress={this.snap.bind(this)} style={[styles.recordButton2]}>
            {/* <Icon.Ionicons name='md-disc' color='red' size={130} /> */}
          </TouchableOpacity>
          {/* <Text style={{ color: "#fff" ,margin:10}}>Long press to record video</Text> */}
          {/* </View> */}
          {/* <TouchableOpacity onPress={() => {
            this.setState({
              whiteBalance: wbOrder[this.state.whiteBalance]
            })
          }}>
            <Icon.Ionicons  name='ios-color-wand' color='#EDC370' size={40} />
          </TouchableOpacity> */}
          <View style={{ flexDirection: 'row', marginTop: 400 }}>
            <TouchableOpacity onPress={() => {
              this.setState({ zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1 });
            }} style={{ marginRight: 20 }}>
              <Icon.Ionicons name='ios-add-circle' color='white' size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({ zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1 });
            }}>
              <Icon.Ionicons name='ios-remove-circle' color='white' size={50} />
            </TouchableOpacity>
          </View>
        </View>



      </Camera>

    );
  }
  startphotocam = () => {
    // let { video1, video2, video3 } = this.state;
    let { image1, image2, image3, image4, image5, image6, image7, image8, image9, image10 } = this.state;

    if (!(image1 && image2 && image3 && image4 && image5 && image6 && image7 && image8 && image9 && image10)) {
      this.setState({
        startphoto: true
      })
    }
    else {
      this.startRecording();
      Alert.alert("only 10 per post")

    }
  }
  startvideocam = () => {
    let { video1, video2, video3 } = this.state;
    if (!(video1 && video2 && video3)) {
      this.setState({
        startcam: true
      })
    } else {
      Alert.alert("only three videos per post")
    }
  }

  ///////////////////////////////////////////////////////////////////////


  ////////////////render the main layout together//////////////////
  render() {
    let { image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, video1, video2, video3, startcam, startphoto } = this.state;
    const camerScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions()
    const camerScreenContent2 = this.state.permissionsGranted
      ? this.renderCamera2()
      : this.renderNoPermissions()
    return (
      <Modal
        ref={'myModal'}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({
            modalVisible: false,
            text: "",
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            image5: null,
            image6: null,
            image7: null,
            image8: null,
            image9: null,
            image10: null,
            startcam: false,
            startphoto: false,
            video1: null,
            video2: null,
            video3: null,
            flash: Camera.Constants.FlashMode.off,
            zoom: 0,
            depth: 0,
            type: Camera.Constants.Type.back,
          })
        }}
      >
        <View style={{ height: this.state.visibleHeight }}>
          {this.renderheader()}
          {/* {this.pastethevideos()} */}
          <KeyboardAvoidingView style={styles.keyboardAvoidContainer} behavior="padding">
            <ScrollView ref='_scrollView' style={{ marginBottom: 5 }} >
              <View>
                {startcam && camerScreenContent}
                {/* {startphoto && camerScreenContent2} */}
                {/* {startcam&&this.getme} */}
                {this.renderText()}
                {/* {this.pastethevideos(video1, video2, video3)} */}
                {this.renderImage({ image1, image2, image3, image4, image5, image6, image7, image8, image9, image10 })}
                {/* {this.renderVideo({video1})}  */}
              </View>

            </ScrollView>
            {this.renderMenu()}

          </KeyboardAvoidingView>


        </View>


      </Modal>
    );
  }
  ////////////////render the main layout together//////////////////


}



const styles = StyleSheet.create({
  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1
  },
  headercotainer: {
    marginTop: 0,
    backgroundColor: 'white',
    height: 65,
    elevation: 4
  },
  headerow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 1,
  },
  headerLeft: {
    marginTop: 10,
    marginLeft: 10
  },
  headerRight: {
    marginTop: 10,
    marginRight: 10
  },
  headertext: {
    fontWeight: "bold",
    fontSize: 30
  },
  icon: {
    marginLeft: 10,
    padding: 5
  },
  imagebackgroundstyle: {
    flex: 1,
    aspectRatio: 0.7,
    marginTop: 2
  },
  closeicon: {
    position: 'absolute',
    top: 5, right: 5,
    marginRight: 2
  },
  recordButton: {
    height: 72,
    width: 72,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    borderRadius: 36,
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "red",
    marginTop: 345

  },
  recordButton2: {
    height: 72,
    width: 72,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    borderRadius: 36,
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "red",
    marginTop: 370

  },


})
