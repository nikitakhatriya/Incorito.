import React from 'react';   
import { ApplicationProvider, Icon, Layout, Text, BottomNavigation, BottomNavigationTab, IconRegistry, Input } from '@ui-kitten/components';
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
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { FAB } from 'react-native-paper';
  
export default class AnnouncementScreen extends React.Component {  
    static navigationOptions = {  
        title: 'Make Announcement',  
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
        title: "",
        description:"",
        link:"",
      }
      //this.handleChangeText = this.handleChangeText.bind(this) //the context of this might change but bind keeps it in this class only
      //controlled(more powerful but we update a lot more tha we need to) and uncontrolled componenets ...
    }

  componentDidMount(){
    console.log("Announcement mounted");
  }

  componentWillUnmount() {
    console.log("Announcement Unmounted");
  }

  Load=()=>{
    if((this.state.title).length>0&&(this.state.description).length>0){
      var user = firebase.auth().currentUser;
        if(user){
          var dbuser = firebase.firestore().collection("announcement").doc().set({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            title: this.state.title,
            description: this.state.description,
            link: this.state.link,
            user: user.uid,
            active: 1,
          });
          console.log('Pressed add Announcement');
          this.props.navigation.navigate('First');
        }
    }else{
        alert("Fill All The Details");
      }
  }

    render() {  
        return (  
          <View style={{flex: 1 , backgroundColor:'white'}}>
            <ScrollView>
              <View style={styles.container}> 
                <View style={styles.label_view}>
                  <Text style={styles.labels}>Title</Text>
                </View>
                <View>
                  <Input style={styles.input_field}
                    placeholder= "Enter Announcement Title"
                    onChangeText = { text => this.setState({title :text})}
                    onPress = {()=>{this.focus()}}
                    selectTextOnFocus={true}
                  />
                </View>
                <View style={styles.label_view}>
                  <Text style={styles.labels}>Description</Text>
                </View>
                <View>
                  <Input
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    numberOfLines={10}
                    multiline={true}
                    onChangeText = { text => this.setState({description :text})}
                    maxLength={100}
                    placeholder="Enter Event Description"
                    placeholderTextColor={'#c7c7c7'}
                    onPress = {()=>{this.focus()}}
                  />
                </View>
                <View style={styles.label_view}>
                  <Text style={styles.labels}>Link</Text>
                </View>
                <View >
                  <TouchableOpacity onPress={() => this.focus()}>
                    <Input style={styles.input_field}
                      placeholder = "Add a Link(if any)"
                      onChangeText = { text => this.setState({link :text})}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style = {styles.button1} onPress={this.Load}>
                <Text style={styles.post}>ANNOUNCE</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );  
    }  
}  

const styles = StyleSheet.create({
  label_view : {
    height: 23,
    left: 16,
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
  input_field:{
    borderStartColor : 'red',
    borderRadius : 5,
    borderStyle : 'solid',
    opacity : 0.7,
    marginLeft:16,
    marginRight:16,
    marginBottom:10,
    marginTop:10,
    backgroundColor: '#F0F1F3',
  },
  description:{
    height:100,
  },
  labels:{
    position: 'absolute',
    fontFamily: 'Rubik',
    fontStyle: 'normal' ,
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 24,
    color: '#222B45',
  },
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    padding : 5,
    backgroundColor : '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:"#409EEC",
  },
  textArea: {
    height: 170,
    justifyContent: "flex-start",
    backgroundColor: '#F0F1F3',
    margin:16,
  },
  button1: {
    position: 'relative',
    margin: 40,
    alignItems: 'baseline',
    justifyContent: 'center',
    bottom: '5%',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#0095FF',
    borderRadius: 4,
    padding: '2%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  post:{
    color: '#FFFFFF',
    fontSize: 15,
  },
});