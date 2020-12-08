import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text
} from 'react-native';
import {
    Card,
    CardHeader,
    Layout,
} from '@ui-kitten/components';4
import Accordion from 'react-native-collapsible/Accordion';
import Autolink from 'react-native-autolink';
const Header = () => (
  <CardHeader title='Eventname'/>
);
const { width } = Dimensions.get('window')
let team = ["","Branding","Techexpo","Robotics","Workshop","Techolympics","Corporate","Nexus","LS","Marketing","Creatives","Initiative","Media","Technothlon","Webops","Heads"]


class CalendarsCard1 extends React.Component{
  state = {
    activeSections:[],
  };

  _renderHeader = section => {
    let subHead,subHead1;
    if(section.meeting){
      
      subHead1 =  <Text style={styles.subHeadTextm}> {section.time} </Text> ;
      subHead =  <Text style={styles.subHeadTextm}> {section.e_title} </Text> ;

      return (

        <View style={[styles.header , styles.cardMeeting , styles.topr ]}>
         <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text>{subHead}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ right:0,position: 'absolute'}}>{subHead1}</Text>
        </View>
        
      </View>
          
        </View>
      );
    }else{
      subHead =  <Text style={styles.subHeadText}>{section.e_name}</Text> ;
      subHead1 =  <Text style={styles.subHeadText}> {section.e_time} </Text> ;
      return (
        <View style={[styles.header , styles.cardPost , styles.topr ]}>
          <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text>{subHead}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ right:0,position: 'absolute'}}>{subHead1}</Text>
        </View>
        
      </View>
          
        </View>
      );
    }
  };

  _renderContent = section => {

    if(section.meeting){
      return (
        <View style={[styles.content,styles.cardMeeting]}>
          <Text style={styles.subsubHeadText}>{section.e_descm}</Text>  
          <Text style={{ flex: 1, paddingLeft: 18}}> {team[section.by_team]}  
          </Text>       
        </View>
      );
    }else{
      return (
        <View style={[styles.content,styles.cardPost]}>
          <Text style={styles.subsubHeadText}>{section.e_desc}</Text>         
        </View>
      );
    }
  };

  _renderFooter = section => {
    return (
      <View style={[styles.footer , section.meeting ? styles.cardMeeting : styles.cardPost , styles.bottomr]}>
        <Text></Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={this.props.data}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        sectionContainerStyle={styles.cardContainer}
        renderFooter={this._renderFooter}
        underlayColor="white"
      />
    );
  }
}

const styles = StyleSheet.create({ 

  cardMeeting: {
    borderLeftWidth : 4,
    borderLeftColor : '#3D9BE9',
    
  },
  topr:{
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  cardPost: {
    borderLeftWidth : 4,
    borderLeftColor : '#FFBC61',
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  cardContainer:{
    //borderLeftWidth : 4,
    margin:5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 30,
  },
  subHeadText:{
    marginHorizontal: 12,
    marginVertical: 8,
    fontFamily: 'Rubik',
    fontSize: 16,
    color: '#FFBC61',
  },
  subsubHeadText:{
    marginHorizontal: 12,
    marginVertical: 8,
    fontFamily: 'Rubik',
    fontSize: 12,
    color: '#7E899D',
    paddingLeft: 10,
  },
  subHeadTextm:{
    marginHorizontal: 12,
    marginVertical: 10,
    fontFamily: 'Rubik',
    fontSize: 16,
    color: '#3D9BE9',
  },
  content: {
    backgroundColor: '#ffffff',
    fontFamily: 'Rubik',
    fontSize: 16,
    color: '#2E3A59',

  },
  bottomr:
  {
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    padding:1,
  },
});

export { CalendarsCard1 }