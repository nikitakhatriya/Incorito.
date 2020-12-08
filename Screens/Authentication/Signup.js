import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import firebase from 'react-native-firebase'
import LoginButton from '../../components/Fb_login'

export default class SignUp extends React.Component {

  componentDidMount(){
      console.log("signup");
      // setRootViewBackgroundColor('#ccc');
  }

  render() {
    return (

        <React.Fragment>
          <View style={{ flex: 1, alignItems: "center" , backgroundColor: '#6ED4C8'}}></View>
          <View style={{ flex: 1, alignItems: "center" , backgroundColor: '#6ED4C8'}}>
            <Image source={require('../../assets/icons/logo.png')} style={{width: 100,height: 100,resizeMode: 'contain'}} />
          </View>
          <View style={{ flex: 2 ,alignItems: "center" , backgroundColor: '#6ED4C8'}}>
            <Text style={{fontSize: 30}}>INCORITO</Text>
            <LoginButton/>
          </View>
          <View style={{ flex: 2 , backgroundColor: '#6ED4C8'}}></View>
        </React.Fragment>
      
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})