import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

// import { fonts, colors } from '../theme'

export default ({ title, onPress, isLoading }) => (

    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={[styles.buttonText]}>{title}</Text>
        {
          isLoading && (
            <View style={styles.activityIndicator}>
              <ActivityIndicator color={"red"} />
            </View>
          )
        }
      </View>
    </TouchableOpacity>

)

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: "#0099ff",
    shadowColor: "black",
    width: 150,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    elevation:10,
    borderWidth:0.5,
    borderColor:"black",

  },
  buttonText: {
    color: "#fff",
    // fontFamily: fonts.light,
    fontSize: 22,
    letterSpacing: 0.5,
    padding: 2,
    fontWeight: "bold",
   
  },
  activityIndicator: {
    transform: [{ scale: 0.90 }],
    justifyContent: "center",

    //     marginTop: 3.5,
    // marginLeft: 5
  }
})