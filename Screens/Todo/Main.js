import React from 'react';   
import { ApplicationProvider, Icon, Layout, Text, BottomNavigation, BottomNavigationTab, IconRegistry } from '@ui-kitten/components';
import {ActivityIndicator, StyleSheet} from 'react-native';
import { FAB, TextInput } from 'react-native-paper';

import firebase from 'react-native-firebase';

import Todolist from '../../components/Noteview'
import { ScrollView } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
  
export default class TodoScreen extends React.Component {  

    constructor() {
      super();
      this.deleteTask = this.deleteTask.bind(this);
      this.state = {
        posts: [],
        loading: true,
        isDialogVisible: false,
      };
    }

  setModalVisible(visible) {
    this.setState({isDialogVisible: visible});
  }
    sendInput(inputText){
      console.log("sendInput (DialogInput#1): "+inputText);
      let user = firebase.auth().currentUser;
      let ref = firebase.firestore().collection('task').doc(user.uid);

      let getDoc = ref.get()
        .then(doc => {
          if (!doc.exists){
            console.log('No such document!');
            ref.set({1: inputText});
          } else {
            console.log('Document data:', doc.data());
            let dictionary = doc.data()
            let posts = [];
            console.log(dictionary);
            for (var key in dictionary) {
              if (dictionary.hasOwnProperty(key)) {           
                  posts.push({ key : key , val : dictionary[key]});
              }
            }
            if(posts.length==0){
              ref.set({1: inputText});
              posts.push({key : 1 , val : inputText});
            }
            else{
              let lastkey = posts[posts.length-1].key;
              dictionary[parseInt(lastkey)+1] = inputText;
              ref.set(dictionary);
              posts.push({key : posts.length+1 , val : inputText});
            }
            this.setState({
              posts,
              loading: false,
           });
            console.log(posts);
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });

        this.setModalVisible(false);

    }
    deleteTask(task) {
      console.log('Tasks: '+task)
      console.log(typeof(task))
      let newposts = this.state.posts.filter(e => e!== task);
      this.setState({
              posts: newposts,
              loading: false
            });
      let user = firebase.auth().currentUser;
      let ref = firebase.firestore().collection('task').doc(user.uid);

      let getDoc = ref.get()
        .then(doc => {
           let dictionary = doc.data()
           let posts = [];
           console.log(dictionary);
           for(let key in dictionary){
            if(key == task.key){
              delete dictionary[key];
            }
           }
          ref.set(dictionary); 
        })
       .catch(err => {
          console.log('Error getting document', err);
        });
}


    componentDidMount() {
      let user = firebase.auth().currentUser;
      // var dbuser = firebase.firestore().collection("task").doc(user.uid).set({
      //   name: "Hello",
      // });
      let ref = firebase.firestore().collection('task').doc(user.uid);
      let getDoc = ref.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
            this.setState({
              loading: false
            });
          } else {
            console.log('Document data:', doc.data());
            let dictionary = doc.data()
            let posts = [];
            console.log(dictionary);
            for (var key in dictionary) {
              if (dictionary.hasOwnProperty(key)) {           
                  posts.push({ key : key , val : dictionary[key]});
              }
            }
            this.setState({
              posts,
              loading: false,
           });
            console.log(posts);
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }

    static navigationOptions = {  
        title: 'Tasks',  
        headerStyle: {  
            backgroundColor: '#ffffff',  
        },  
        //headerTintColor: '#0ff',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        },  
    };  
  
    render() {  
      if (this.state.loading) {
        return <ActivityIndicator size="large" />;
      }

       let all_post = this.state.posts.map( (data, index) => {
        return (
              <Todolist key={data.key} pass_in_data={data} deleteTask={this.deleteTask} />
          )
      })
        return (
          <React.Fragment> 
            <ScrollView> 
              {all_post}
              <DialogInput isDialogVisible={this.state.isDialogVisible}
                title={"ADD TASK"}
                message={"Todo Input"}
                hintInput ={"Type"}
                submitInput={ (inputText) => {this.sendInput(inputText)} }
                closeDialog={ () => {this.setModalVisible(false)}}>
              </DialogInput>
            </ScrollView>
            <FAB
                style={styles.fab}
                medium
                color="#FFFFFF"
                icon="plus"
                onPress={() => {this.setModalVisible(true); }}
              />
          </React.Fragment>
        );  
    }  
}  
const styles = StyleSheet.create({
  fab: {
     position: 'absolute',
     margin: 16,
     bottom: 0,
     right: 0,
     backgroundColor:'#409EEC'
  },
});