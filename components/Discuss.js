import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import {
  Card,
  CardHeader,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Icon, IconElement } from '@ui-kitten/components';
import { List, Checkbox } from 'react-native-paper';
import { View } from 'react-native';
import { PostScreen } from '../Screens/Discussion/Post';
import  { Avatar } from 'react-native-elements';

const AgendaIcon = (style) => (
  <Icon {...style} name='checkmark-square-outline' />
  );
const HeartIcon = (style) => (
  <Icon {...style} name='heart'/>
  );

const MessageCircleIcon = (style) => (
  <Icon {...style} name='message-circle-outline'/>
  );


// export const CustomHeader = () => (
//   <React.Fragment>

//     <Text
//       style={styles.headerText}
//       category='h6'>
//       {this.props.pass_in_data.post}
//     </Text>
//   </React.Fragment>
// );


let team = ["","Branding","Techexpo","Robotics","Workshop","Techolympics","Corporate","Nexus","LS","Marketing","Creatives","Initiative","Media","Technothlon","Webops","Heads"]


class DiscussTest extends React.Component {

  state = {
    expanded: true
  }

  _handlePress = () =>
  this.setState({
    expanded: !this.state.expanded
  });

  // Posthandle(data) {
  //   console.log(data);
  // }

  render() {
    return(
      
      <Card style={styles.card} status='success' onPress={() => this.props.load(this.props.pass_in_data)} >
       
       <View style={styles.activityContainer}>
        <View style={{flex: 1, flexDirection: 'column'}}>
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
              <Text style={styles.title} > {this.props.pass_in_data.p_uname} </Text>
              <Text style={{color: 'grey'}}> {team[this.props.pass_in_data.p_teamid]}</Text>  
              </View>
          </View>   
        </View>
              <View style={styles.comment}>
               <View style={styles.commenticon}>
                <Button
                  style = {styles.Button}
                  appearance='ghost'
                  status='basic'
                  icon={MessageCircleIcon}
                  > 
                </Button>
                </View>
              </View>
               
             </View>
        
        <View style={{flex: 1, justifyContent:'space-between', paddingLeft: 5}}>
            <Text style={styles.headerText} >
            {this.props.pass_in_data.post_title}
            </Text>
          

            <Text style={styles.text} >
            {this.props.pass_in_data.post}
            </Text>
          </View>

      </Card>

    
      );
  }
}

const styles = StyleSheet.create({  
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  header: {
    marginHorizontal: 0,
    marginVertical: 0,

  },
  headerText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
    color: '#49536D',
    left:0,
    marginVertical: 10,
  },
  activityContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    
    
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  col: {
    flex: 1,
    flexDirection: "column"
  },
  text: {
    textAlign:'justify', 
    fontFamily:'Rubik',
    fontStyle:'normal',
    fontWeight:'normal',
    fontSize:14,
    lineHeight: 17,
    color: '#7E899D',
    marginTop: 0,

  },
  title: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: 16,
    color: '#222B45',
    marginRight: 0, 
  },
  comment: {
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingTop: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  commentcount: {
    color: '#C5CEE0',
    marginTop: 10,
    fontSize:16,

  },
  commenticon: {
    color: '#C5CEE0',
    margin: 0,
    opacity: 1,
  },
  Button: {
    position: 'absolute',
    flexDirection: 'row',
    paddingTop: 0,
    right: -35,
    top: -8,
  
}

});

export default DiscussTest;