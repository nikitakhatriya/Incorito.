import React from 'react';   
import { ApplicationProvider, Icon, Layout, Text, BottomNavigation, BottomNavigationTab, IconRegistry } from '@ui-kitten/components';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { FAB } from 'react-native-paper';
import firebase from 'react-native-firebase';

import DiscussTest from '../../components/Discuss'
import { ScrollView } from 'react-native-gesture-handler';
  
export default class DiscussionScreen extends React.Component {  

    constructor() {
      super();
      this.ref = firebase.firestore().collection('discussion').orderBy('createdAt','desc');
      this.unsubscribe = null;
      this.state = {
        posts: [],
        loading: true,
      };
    }

    componentDidMount() {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    onCollectionUpdate = (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        const {post_title,post, p_uname, p_teamid, commentcount, p_avatar } = doc.data();
        posts.push({
          key: doc.id, // Document ID
          post_title,
          post,
          p_uname,
          p_teamid,
          p_avatar,
          commentcount,
        });
      });
      this.setState({
        posts,
        loading: false,
     });
      // this.props.navigation.navigate('Second',{text:posts})

      // console.log(posts)
    }

    static navigationOptions = {  
        title: 'Discussion',  
        headerStyle: {  
            backgroundColor: '#ffffff',  
        },  
        //headerTintColor: '#0ff',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        },  
    };  

    load (data,key){
      this.props.navigation.navigate('Second',{text:data , key:key});
    }

    render() {  
      if (this.state.loading) {
        return <ActivityIndicator size="large" />;
      }

       let all_post = this.state.posts.map( (data, index) => {
        return (
              <DiscussTest key={data.key} pass_in_data={data} load={() => this.load(data,data.key)} />
          )
      })
        return (

            <View style={{flex: 1 , backgroundColor: '#E5E5E5'}}>
            <ScrollView> 
             {all_post}
            </ScrollView>
            <FAB
                style={styles.fab}
                medium
                icon="plus"
                color="#FFFFFF"
                onPress={() => {this.props.navigation.navigate('Third');}}
              />
              </View>
        );  
    }  
}  
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'#409EEC',
  }
});
