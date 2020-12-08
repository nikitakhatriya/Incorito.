import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Calendar , LocaleConfig } from 'react-native-calendars';
import { CalendarsCard1 } from '../../components/calandercard';
import { FAB } from 'react-native-paper';
import { load } from '../../components/timePicker';
import firebase from 'react-native-firebase'
import { ScrollView } from 'react-native-gesture-handler';

LocaleConfig.locales['en'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['S','M','T','W','T','F','S']
};
LocaleConfig.defaultLocale = 'en';


let curDate = new Date().getFullYear()+'-'+('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+new Date().getDate()).slice(-2);
export default class CalendarScreen extends Component{
  constructor(){
    super();
    this.state = { selected : curDate, posts: {}, dots1:{} , events:[]};
    this.ref = firebase.firestore().collection('calendar').doc((this.state.selected).slice(0,4)).collection('month').doc((this.state.selected).slice(5,7)).collection('day');
    this.onDayPress = this.onDayPress;
    this.unsubscribe = null;
  }

  static navigationOptions={
    title: 'Calendar',
    headerStyle: {  
      backgroundColor: '#ffffff',  
    },  
    headerTitleStyle: {  
      fontWeight: 'bold',  
    },  
  };

  componentDidMount (){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate); 
  }

  onCollectionUpdate = (querySnapshot) => {
    const post = {},post1={};
    querySnapshot.forEach((doc)=>{
      post[doc.id] = doc.data();
    });
    var dots={};
    var junk=0;
    for(var x in post){
      if(junk==1){
        junk=0;
      }else{
        var apd = {}
        var cur = this.state.selected.slice(0,4)+"-"+(this.state.selected).slice(5,7)+"-"+x[0]+x[1];
        var ism=0;
        var ise=0;
        for(var y in post){
          if(x[0]==y[0]&&x[1]==y[1]&&y[2]=="E"){
            ise=1;
          }
          if(x[0]==y[0]&&x[1]==y[1]&&y[2]=="M"){
            ism=1;
          }
        }
        if(ise&&ism){
          apd["dots"] = [{key:'event', color: '#FFBC61'},{key:'meeting', color: '#3D9BE9'}];
          dots[cur] = apd;
          junk=1;
        }else if(ise){
          apd["dots"] = [{key:'event', color: '#FFBC61'}];
          dots[cur] = apd;
        }else if(ism){
          apd["dots"] = [{key:'meeting', color: '#3D9BE9'}];
          dots[cur] = apd;
        }
      }
    }
    dots[this.state.selected] = {selected: true, disableTouchEvent: true};
    this.setState({posts:post , dots1:dots});
  }

  Loader=(mont)=>{
    this.ref = firebase.firestore().collection('calendar').doc((this.state.selected).slice(0,4)).collection('month').doc(mont.toString()).collection('day');
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    if(mont.toString()!=this.state.selected.slice(5,7)){
      if(mont.toString()=='01'&&this.state.selected.slice(5,7)=='12'){
        this.setState({
          selected: (parseInt(((this.state.selected).slice(0,4)).toString())+1).toString()+"-"+mont.toString()+"-"+"01"
        });
      }else if(mont.toString()=='12'&&this.state.selected.slice(5,7)=='01'){
        this.setState({
          selected: (parseInt(((this.state.selected).slice(0,4)).toString())-1).toString()+"-"+mont.toString()+"-"+"01"
        });
      }else{
        this.setState({
          selected: ((this.state.selected).slice(0,4)).toString()+"-"+mont.toString()+"-"+"01"
        });
      }
    }
  }

  Load=()=>{
    this.props.navigation.navigate('Second',{date:this.state.selected});
    console.log('Pressed');
    load();
    this.setState({selected:curDate});
  }

  AMPM=(etime)=>{
    var ti=parseInt(etime[0]+etime[1]);
    var etime1="",ampm="";
    if(ti>=12){
      ampm=" PM";
      ti=ti-12;
      var tii=ti.toString();
      if(ti>=10){
        etime1=tii[0]+tii[1];
      }else{
        etime1="0"+tii[0];
      }
    }else{
      etime1=etime[0]+etime[1];
      ampm=" AM";
    }
    etime1=etime1+etime[2]+etime[3]+etime[3]+ampm;
    return etime1;
  }

  render(){
    var x=(this.state.selected).slice(8,10).toString()+"E";
    var y=(this.state.selected).slice(8,10).toString()+"M";
    this.state.events = [];
    if(this.state.posts[x]){
      for(var i in this.state.posts[x]){
        var e = "E";
        if(this.state.posts[x][i]){
          var card_data = {}
          card_data['events'] = true;
          card_data['meeting'] = false;
          card_data["e_desc"]=this.state.posts[x][i]["description"];
          card_data["e_time"]=this.AMPM(this.state.posts[x][i]["Event_time"]);
          card_data["e_person"]=this.state.posts[x][i]["user_name"];
          card_data["e_team"]=this.state.posts[x][i]["user_team"]; 
          card_data["e_name"]=this.state.posts[x][i]["title"];
          card_data["ide"] = e;
          this.state.events.push(card_data);
        }
      }
    }

    if(this.state.posts[y]){
      for(var i in this.state.posts[y]){
        var e = "M";
        if(this.state.posts[y][i]){
          var card_data = {};
          card_data['events'] = false;
          card_data['meeting'] = true;
          card_data["e_descm"]=this.state.posts[y][i]["description"];
          card_data["e_title"]=this.state.posts[y][i]["title"];
          card_data["by_team"]=this.state.posts[y][i]["by_team"];
          card_data["venue"]=this.state.posts[y][i]["venue"];
          card_data["team"]=(this.state.posts[y][i]["team"]);
          card_data["time"]=this.AMPM(this.state.posts[y][i]["time"]);
          card_data["ide"] = e;
          this.state.events.push(card_data);
        }
      }
    }
      return (
        <View style={styles.container1}>
          <Calendar
            style={styles.calendar}
            markingType={'multi-dot'}
            onDayPress={this.onDayPress}
            onMonthChange={(month) => {this.Loader(month.dateString.slice(5,7))}}
            current={this.state.selected}
            markedDates={this.state.dots1}
            hideArrows={false}
            hideExtraDays={true}
            firstDay={0}
          />
          <ScrollView style={{backgroundColor: '#F0F1F3'}}>
            <CalendarsCard1 data={this.state.events}/>
          </ScrollView>
          <FAB style={styles.fab} medium icon="plus" color="#FFFFFF" onPress={this.Load}/>
        </View>
      )
    
  };

  onDayPress=(day)=>{
    this.setState({
      selected: day.dateString
    });
    this.Loader((this.state.selected).slice(5,7));
  }
}


const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 365,
    marginTop:1,
  },
  text: {
    textAlign: 'left',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container1: {
    flex: 1,
    backgroundColor:'#E5E5E5',
  },
  head: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'#409EEC',
  },
});