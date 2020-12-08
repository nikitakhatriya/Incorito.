import React from 'react';   
import { ApplicationProvider, Icon, Layout, Text, BottomNavigation, BottomNavigationTab, IconRegistry } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CommentsTest from '../../components/Comments'
  
export default class PostScreen extends React.Component {  

  constructor() {
      super();
      this.state = {
        posts: [],
        loading: true,
      };
    }

  componentDidMount(){
    const {state} = this.props.navigation;
    // console.log("PROPS " + state.params.text);
    const posts=[];
    // console.log(state.params.text.id);
     const p_uname = state.params.text.p_uname;
     const p_avatar = state.params.text.p_avatar;
     const p_teamid = state.params.text.p_teamid;
     const commentcount = state.params.text.commentcount;
      const likes = state.params.text.likes;
      const post = state.params.text.post;
      const post_title = state.params.text.post_title;
      const key = state.params.key;
      // console.log(key);
      posts.push({
        p_uname, likes, post,key,commentcount,post_title, p_avatar,p_teamid
      });
        // commentsmap.clear();
    
    // console.log(posts);
    this.setState({
        posts,
        loading: false,
     });
  }
    static navigationOptions = {  
        title: 'Post',  
        headerStyle: {  
            backgroundColor: '#ffffff',  
        },  
        //headerTintColor: '#0ff',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        },  
    };  
  
    render() {   

        let all_post = this.state.posts.map( (data, index) => {
        return (
              <CommentsTest pass_in_data={data} />
          )
      })
        return (
           <View style={{flex: 1 , backgroundColor: '#F0F1F3'}}>
            
             {all_post}
    
          </View>
        );  
    }  
    }  
  