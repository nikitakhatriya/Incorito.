import React from 'react';   
import { ApplicationProvider, Icon, Layout, Text, BottomNavigation, BottomNavigationTab, IconRegistry } from '@ui-kitten/components';
import { Component } from 'react';
import firebase from 'react-native-firebase'
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  Modal,
  TouchableOpacity
} from 'react-native';
import { FAB } from 'react-native-paper';

  
export default class AddPostScreen extends React.Component {  
    static navigationOptions = {  
        title: 'Add Post',  
        headerStyle: {  
             
        },  
        //headerTintColor: '#0ff',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        },  
    };  

    constructor(){
    super()
    this.state = {
      post: "Write a Post ",    
      post_title: "Webops rocks!"
    }

    }


  Load = () => {
    var user = firebase.auth().currentUser;
      if(user){
        let userRef = firebase.firestore().collection('user').doc(user.uid);

        let userData = userRef.get()
         .then(doc => {
          if(doc.exists){ 
            let data=doc.data();
            var dbuser = firebase.firestore().collection("discussion").doc().set({
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              post: this.state.post,
              post_title: this.state.post_title,
              p_uname: data['name'],
              p_teamid: data['team'],
              p_avatar: data['avatar'],
              commentcount: 0,
            });
            console.log('Pressed add Post');
            this.props.navigation.navigate('First');
          }
         })
         .catch(err => {
          console.log('Error getting document', err);
          });
      }
  }

  
  
    render() {  
        return (  
            <View style={styles.container}> 

                <View style={styles.label_view}>
                <Text style={styles.labels}>Title</Text>
                
                </View>
                <View>
                <TextInput style={styles.title_field}
                  placeholder = "Title goes here" 
                  textAlignVertical = {"top"}
                  onChangeText = { text => this.setState({post_title:text})}
                 />
                </View>
                <View style={styles.label_view}>
                <Text style={styles.labels}>Text</Text>
                
                </View>
                <View>
                <TextInput style={[styles.title_field , styles.description]}  multiline = {true} numberOfLines = {100}
                  placeholder = "Type here" 
                  textAlignVertical = {"top"}
                  onChangeText = { text => this.setState({post:text})}
                 />
                </View>
                
                <TouchableOpacity style = {styles.button1} onPress={this.Load}>
                  <Text style={styles.post}>POST</Text>
                </TouchableOpacity>

        </View>




        );  
    }  

}  

const styles = StyleSheet.create({

  label_view : 
  {
    
height: 23,
left: 0,
right: 187,
top: 2,

fontFamily: 'Rubik',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: 16,
lineHeight: 24,
margin:1,

color: '#222B45',
  },

  select:{
    
    borderWidth:0.2,
    borderRadius : 5,
    borderStyle : 'solid',
   
    margin:6,
  },

  input_field:
  {
    borderStartColor : 'red',
    borderWidth:0,
    borderRadius : 5,
    borderStyle : 'solid',
    // backgroundColor : '#F0F1F3',
    opacity : 1,
    marginTop: 32,
    

  },
  title_field:
  {
    borderStartColor : 'red',
    borderWidth:0,
    borderRadius : 5,
    borderStyle : 'solid',
    // backgroundColor : '#F0F1F3',
    opacity : 1,
    marginTop: 16,

    fontFamily: 'Rubik',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: 24,
lineHeight: 24,
marginBottom: 16,

color: '#000000',

  },
  description:
  {
    height:430,
  },


  labels:{
    position: 'absolute',
    fontFamily: 'Rubik',
    fontStyle: 'normal' ,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    color: '#49536D',
  },

  container:{
    flex: 1,
    justifyContent: 'flex-start',
    padding : 40,
    backgroundColor : '#FFFFFF',


  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor:'#409EEC'
  },
  button1: {
    position: 'absolute',
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '5%',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#0095FF',
    borderRadius: 4,
    padding: '5%',
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  post:{
    color: '#FFFFFF',
    fontSize: 20,
  }
});