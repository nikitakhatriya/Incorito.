import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  Card,
  CardHeader,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';
import  { Avatar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Icon, IconElement, Input, ListItem } from '@ui-kitten/components';
import { List, Checkbox } from 'react-native-paper';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const AgendaIcon = (style) => (
    <Icon {...style} name='checkmark-square-outline' />
  );
const HeartIcon = (style) => (
    <Icon {...style} name='heart'/>
  );
  
const MessageCircleIcon = (style) => (
    <Icon {...style} name='message-circle-outline'/>
  );
const SubmitArrow = (style) => (
    <Icon {...style} name='arrow-circle-right-outline'/>
  );
let team = ["","Branding","Techexpo","Robotics","Workshop","Techolympics","Corporate","Nexus","LS","Marketing","Creatives","Initiative","Media","Technothlon","Webops","Heads"]


class CommentsTest extends React.Component {
  constructor(){
    super();
    this.unsubscribe = null;
    this.state = {
      expanded: true,
      comments: [],
      commenttext: '',
      name: '',
      loading: true
    }
}
componentDidMount() {
  let ref = firebase.firestore().collection('discussion').doc(this.props.pass_in_data.key).collection('comment').orderBy('createdAt','desc');
  this.unsubscribe = ref.onSnapshot( querySnapshot => {
              const comments = [];
              querySnapshot.forEach(doc => {
                const { commenttext, user} = doc.data();
                   comments.push({
                    cmkey: doc.id,
                    commenttext,
                    user,
                   });
              });
                this.setState({
                  comments,
                  loading: false,
                });
            }
            
  );
}
Load = () => {
   var user = firebase.auth().currentUser;
   var com =  this.state.commenttext;
      if(user){
        if(com != ""){
          let userRef = firebase.firestore().collection('user').doc(user.uid);
          let userData = userRef.get()
           .then(doc => {
             if(doc.exists){
                let data=doc.data();
                var dbuser = firebase.firestore().collection("discussion").doc(this.props.pass_in_data.key).collection('comment').doc().set({
                   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                   user: data['name'],
                   commenttext:com,
                });
                this.updatecommentcount();

              }
            })
           .catch(err => {
            console.log('Error getting document', err);
            });
        }
        else{
          alert('Add a Comment');
        }
      }
      
      this.setState({
        commenttext: '',
      }); 
      // this.updatecommentcount();
}

updatecommentcount(){
  
  let v = this.props.pass_in_data.commentcount+1;
      let cupd = firebase.firestore().collection('discussion').doc(this.props.pass_in_data.key).update({commentcount: v });
}

_handlePress = () => {
  this.setState({
    expanded: !this.state.expanded
  })
}
  render() {
    
    let all_commentlist = this.state.comments.map( (data, index) => {
        return (
          <View>
              <ListItem
                  style={{backgroundColor:  '#F0F1F3'}}
                  title={data.user}
                  description={data.commenttext}
                  icon={MessageCircleIcon}
                />
                <View
                  style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#C5CEE0",
                    marginLeft: "14%"
                  }}
                />
                </View>
          )
      });
    if(this.state.loading) {
       return <ActivityIndicator size="large" />;
    }
    return(
      <View style={styles.container}>
        <ScrollView>
          <Card style={styles.card}  status='success'>
              <View style={styles.header}>
              <View style={styles.row}>
                <Avatar
                  rounded
                  size={40}
                  source={{
                    uri:
                      this.props.pass_in_data.p_avatar,
                  }}
                /><Text>  </Text>
                 <View style={styles.col}>
                <Text style={styles.headerText}>
                {this.props.pass_in_data.p_uname}
                </Text>
                      <Text style={{color: 'grey'}}>
                {team[this.props.pass_in_data.p_teamid]}{'\n'}
                </Text>
                </View>
                </View>
            </View>
            <Text style={styles.postTitle} >
            {this.props.pass_in_data.post_title}
            </Text>
                <Text style={styles.text}>
                 {this.props.pass_in_data.post}
                  </Text>
              <View
                style={{
                  marginTop: '5%',
                  borderBottomColor: '#E0DFE5',
                  borderBottomWidth: 1,
                }}
              />
          
            <View style={styles.activityContainer}>
            <Button
              style={styles.reactionButton}
              appearance='ghost'
              status='basic'
              icon={MessageCircleIcon}>
              
            </Button>
            <Text>
                {this.state.comments.length} comments
            </Text>
          </View>
          </Card>
          
          <View style={styles.allcomment} >
            {all_commentlist}
          </View>
        </ScrollView>
              
          <View style={styles.inputview}>
            <TextInput
              style={styles.input_field }
              placeholder = 'Write a comment'
              value = {this.state.commenttext}
              onChangeText = { text => this.setState({commenttext :text})}
              onSubmitEditing = {this.Load}
              multiline = {true} numberOfLines = {2}
              />
              <Button
                style={styles.submitbutton}
                appearance='ghost'
                status='basic'
                icon={SubmitArrow}
                onPress={this.Load}
              />  
          </View>

        
      </View>
      );
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 10,
  }, 
  card: {
    flex: 5,
    alignItems: 'stretch',
    marginVertical: 10,
    marginHorizontal: 0,
  },
  allcomment: {
    flex: 5,
  },
  header: {
    marginHorizontal: 0,
    marginVertical: 16,

  },
  headerText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    color: '#192038',
    left:0,
  },
  input_field:
  {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 20,
    color: '#7E899D',

  },

  reactionButton: {
          paddingHorizontal: 0,
        },
  activityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    row: {
    flex: 1,
    flexDirection: "row"
  },
  col: {
    flex: 1,
    flexDirection: "column"
  },
  inputview:
  {
      paddingLeft: 12,
      justifyContent: 'flex-end',
      marginBottom: 10,
      borderColor: 'black',
      backgroundColor: '#FFFFFF',
      marginHorizontal: 10,
      borderRadius: 5,

  },
  submitbutton: {
    position: 'absolute',
    marginRight: 0,
    marginTop : 20,
    right: 1,

  },
  postTitle: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
    color: '#49536D',
    left:0,
  },
  text: {
        textAlign:'justify', 
    fontFamily:'Rubik',
    fontStyle:'normal',
    fontWeight:'normal',
    fontSize:16,
    marginTop: 5,
    lineHeight: 18,
    color: '#8F9BB3'

  }
});

export default CommentsTest;