import { ScrollView, StyleSheet, View,} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {
  Layout,
  Text,
} from '@ui-kitten/components';
import Autolink from 'react-native-autolink';

import firebase from 'react-native-firebase';

import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';

let team = ["","Branding","Techexpo","Robotics","Workshop","Techolympics","Corporate","Nexus","LS","Marketing","Creatives","Initiative","Media","Technothlon","Webops","Heads"]

class ContactButton extends Component {
  
    

  render() {
    return (
      <View style={[styles.header , styles.cardPost , styles.topr ]}>
        <Text style={styles.headerText}>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
  headerText: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,

    color: '#192038',

  },
  content: {
    backgroundColor: '#ffffff',

    padding:20,
    fontFamily: 'Rubik',
    fontSize: 16,
    color: '#2E3A59',

  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  cardMeeting: {
    borderLeftWidth : 4,
    borderLeftColor : 'yellow',
    
  },
  topr:
  {
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },

  bottomr:
  {
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
  },
  cardPost: {
    borderLeftWidth : 4,
    borderLeftColor : '#409EEC',
    marginHorizontal: 1,

  },
 
  cardContainer:{
    //borderLeftWidth : 4,
    margin:5,
    borderRadius: 5,
  },
  footer: {
    backgroundColor: '#fff',
  },
  subHeadText:{
    marginHorizontal: 12,
    marginVertical: 8,
    fontFamily: 'Rubik',
    fontSize: 16,
    color: '#7E899D',
  },
});
export default ContactButton;