import { ScrollView, StyleSheet, View, Image} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {
  Layout,
  Text,
  Icon
} from '@ui-kitten/components';
import Autolink from 'react-native-autolink';

import firebase from 'react-native-firebase';

import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';

let team = ["","Branding","Techexpo","Robotics","Workshop","Techolympics","Corporate","Nexus","LS","Marketing","Creatives","Initiative","Media","Technothlon","Webops","Heads"]

const IconInlineStylingShowcase = () => (
  <Icon
    name='github'
    width={32}
    height={32}
    fill='#FF7E6D'
  />
)
class LAE extends Component {
  state = {
    activeSections: [],
  };

  _renderHeader = (section, _, isActive) => {

    let subHead , icn;

    if(isActive){
      icn = require("../assets/icons/arrow-ios-up.png");
    }
    else{
      icn = require("../assets/icons/arrow-ios-down.png");
    }

    if(section.meeting==1)
    {
      subHead =  <Text style={styles.subHeadText}>{section.date} | {section.time} | {section.venue}</Text> ;
    }
    else
    {
      subHead =  <Text style={styles.subHeadText}>Date: {section.date}</Text> ;

    }
    return (

      <View style={[styles.header , section.meeting ? styles.cardMeeting : styles.cardPost , styles.topr ]}>
          <View style={{ flex: 1, flexDirection: 'row'}}>
      
            <Text style={styles.headerText}>  {section.title} </Text>
    
            <View style={{ flex: 1 }}>
              <Text style={{ right:0,position: 'absolute'}}><Image source={icn} style={{width: 15,height: 15}} /></Text>
            </View>
        
        </View>
        {subHead} 
      </View>
    );
  };

  _renderContent = section => {

    return (
      <View style={[styles.content, section.meeting ? styles.cardMeeting : styles.cardPost ]}>
        <Text>{section.description}</Text>
        <Autolink
            text={section.link}/>          
      </View>
    );
  };

  _renderFooter = section => {
    const icn  = {uri: section.avatar}
    return (
      <View style={[styles.footer , section.meeting ? styles.cardMeeting : styles.cardPost , styles.bottomr]}>
        <View style={{borderBottomColor: '#E4E9F2',borderBottomWidth: 1,}}/>
          <Card.Title title={section.head} subtitle={team[section.tid]} left={(props) => <Avatar.Image size={52} source={icn} />} />
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={this.props.SECTIONS}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        renderFooter={this._renderFooter}
        sectionContainerStyle={styles.cardContainer}
        underlayColor="white"
      />

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
  cardMeeting: {
    borderLeftWidth : 5,
    borderLeftColor : '#FFBC61',
    
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
    borderLeftWidth : 5,
    borderLeftColor : '#3D9BE9',

  },
 
  cardContainer:{
    //borderLeftWidth : 5,
    margin:5,
    borderRadius: 5,
  },
  footer: {
    backgroundColor: '#fff',
  },
  subHeadText:{
    marginHorizontal: 8,
    marginVertical: 8,
    fontFamily: 'Rubik',
    fontSize: 16,
    color: '#7E899D',
  },
});
export default LAE;