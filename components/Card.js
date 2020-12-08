import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {
  Card,
  CardHeader,
  Layout,
  Text,
} from '@ui-kitten/components';

import { List, Checkbox } from 'react-native-paper';
import { Avatar } from 'react-native-elements';



const t="gi";
const d="gdfgi";



export const CustomHeader = () => (
                          <React.Fragment>
                          <List.Accordion
                            title={t}
                          >
                            <List.Item title={d} />
                          </List.Accordion>
                          </React.Fragment>
                          );
                         


class CardMeet extends React.Component {

  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    return(
      <Layout>
      <View style={styles.card}>
      <View style={styles.cardMeet}>
        <Card style={styles.card} >
        <View style={styles.container}>
            <List.Accordion
              title="Expandable list item"
              id="1"
            >
              <List.Item title="List item 1" />
              <List.Item title="List item 2" />
            </List.Accordion>
        </View>

          <View style={styles.avatar}>

          <View>
              <Avatar size="small"
              rounded
              source={{
              uri:
                'https://techniche.org/static/images/logo.png',
              }}
              />
           </View>
           <View>
                <Text>
                {this.props.meet.head}
                </Text>
            </View>

          </View>
        </Card>
      </View>
    </View>
  </Layout>
      );
  }
}


class CardAnnounce extends React.Component {

  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });
4
  render() {
    return(
      <Layout>
      <View style={styles.card}>
        <Card style={styles.cardAnnounce} 
              status='success'>
              <React.Fragment>
                <List.Accordion
                  title={this.props.ann.title}
                  style={styles.title}

                >
                  <List.Item title={this.props.ann.description} />
                </List.Accordion>
              </React.Fragment>


          <Text
            style={styles.headerText}
            category='h6'>
            {this.props.since}
          </Text>


          <View style={styles.avatar}>

          <View>
              <Avatar size="small"
              rounded
              source={{
              uri:
                'https://techniche.org/static/images/logo.png',
              }}
              />
           </View>
           <View>
                <Text>
                {this.props.ann.head}
                </Text>
            </View>

          </View>
          <Text>
            {this.props.ann.head}
          </Text>
        </Card>
        </View>
      </Layout>
      );
  }
}



//post head daysago
class CardPost extends React.Component {

  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });
4
  render() {
    return(
      <Layout>
      <View style={styles.card}>
        <Card style={styles.cardPost} 
              status='success'>
              <React.Fragment>
                <List.Accordion
                  title={this.props.post.title}
                  style={styles.title}

                >
                  <List.Item title={this.props.post.description} />
                </List.Accordion>
              </React.Fragment>


          <View style={styles.avatar}>

          <View>
              <Avatar size="small"
              rounded
              source={{
              uri:
                'https://techniche.org/static/images/logo.png',
              }}
              />
           </View>
           <View>
                <Text>
                {this.props.post.head}
                </Text>
            </View>

          </View>

        </Card>
        </View>
      </Layout>
      );
  }
}

export { CardPost, CardAnnounce, CardMeet }



const styles = StyleSheet.create({  
  avatar: {
    flex: 1, flexDirection: 'row'

  },
  title:{
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    color: '#192038',
    left:0,
  },

  card: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 10,
  
  },

  cardMeet: {
    borderLeftColor : 'red',
    borderLeftWidth : 5,
    
    

  },
  cardAnnounce: {
    borderLeftColor : 'red',
    borderLeftWidth : 4,
    padding: 6,
    height: 200,
    

  },
  cardPost: {
    borderLeftColor : 'blue',
    borderLeftWidth : 4,
    padding: 6,
    height: 200,
    

  },
  headerText: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderBottomWidth : 2,
    fontFamily: 'Rubik',
    fontSize: 16,
    lineHeight: 19,
    color: '#7E899D',
      },

  container: {
    flex: 1,
  },

});

