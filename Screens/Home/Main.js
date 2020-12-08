import React from 'react';   
import { ApplicationProvider, Icon, Layout, Text, BottomNavigation, BottomNavigationTab, IconRegistry } from '@ui-kitten/components';
import firebase from 'react-native-firebase'

import { CardPost, CardAnnounce, CardMeet } from '../../components/Card'
import LAE from '../../components/try'
import { StyleSheet , View , ScrollView,BackHandler, Dimensions, Menu, screenProps, MenuItem,ActivityIndicator, RefreshControl} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';  
import {
  Button,
  OverflowMenu,
  Select,
  Modal,
} from '@ui-kitten/components';
import ToolbarDropdown from '../../components/Dropdown';
import { FloatingAction } from "react-native-floating-action";


let meeting={
        date:"Jan 1",
        venue:"New sac",
        time:"10:00AM",
        detail:"Jan 1 | 10:00AM | New sac",
        title:"ALL TEAM MEET",
        description:"this is a meeting to motivate you",
        head:"raghav",

    }


 
    
export default class HomeScreen extends React.Component {  

    constructor() {
      super();
      this.usr = firebase.firestore().collection('user');
      this.anno = firebase.firestore().collection('announcement').orderBy('createdAt', 'desc');
      this.meet = firebase.firestore().collection('team_meet').orderBy('createdAt','desc');
      this.unsubscribe = null;
      this.aunsubscribe = null;
      this.munsubscribe = null;
      // need to bind `this` to access props in handler
      this.logout = this.logout.bind(this);
      this.state = {
        all_user : {},
        anno : [],
        meet : [],
        section: [],
        refreshing: false,
        loading: true,
      }
    }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.setState({refreshing: false});
    // fetch().then(() => {
    //   this.setState({refreshing: false});
    // });
  }

    fetch(){
      // this.unsubscribe = this.usr.onSnapshot(this.onCollectionUpdate)
      console.log("wait");
    }

    componentDidMount(){
      this.unsubscribe = this.usr.onSnapshot(this.onCollectionUpdate)
      // this.unsubscribe = this.meet.onSnapshot(this.onCollectionUpdate2)
    }

    onCollectionUpdate = async(querySnapshot) => {
      const all_user = {};
      querySnapshot.forEach((doc) => {
        all_user[doc.id] = doc.data();
      });
      this.setState({
        all_user,
     });
      // console.log(all_user);
      this.aunsubscribe = this.anno.onSnapshot(this.onCollectionUpdate1)
    }

    onCollectionUpdate1 = async(querySnapshot) => {
      const anno = [];
      await querySnapshot.forEach((doc) => {
        var det = {};
        det = doc.data();
        det['key'] = doc.id;
        anno.push(det);
      });
      this.setState({
        anno,
     });
      // console.log(anno);
      this.munsubscribe = this.meet.onSnapshot(this.onCollectionUpdate2)
    }

    onCollectionUpdate2 = async(querySnapshot) => {
      const meet = [];
      await querySnapshot.forEach((doc) => {
        var det = {};
        det = doc.data();
        det['key'] = doc.id;
        meet.push(det);
      });
      this.setState({
        meet,
     });
      // console.log(meet);
      // console.log(this.state.anno);
      // console.log(this.state.all_user);
      var sections = []
      for(var x in this.state.anno){
        var apd = {};
        console.log(this.state.anno[x]['createdAt'].toDate().getDate());
        apd['meeting'] = 0;
        apd['title'] = this.state.anno[x]['title'];
        apd['createdAt'] = this.state.anno[x]['createdAt'];
        apd['description'] = this.state.anno[x]['description'];
        apd['date'] = this.state.anno[x]['createdAt'].toDate().getDate()+"/"+this.state.anno[x]['createdAt'].toDate().getMonth()+"/"+this.state.anno[x]['createdAt'].toDate().getFullYear();
        apd['link'] = this.state.anno[x]['link'];
        apd['head'] = this.state.all_user[this.state.anno[x]['user']].name;
        apd['tid'] = this.state.all_user[this.state.anno[x]['user']].team;
        apd['avatar'] = this.state.all_user[this.state.anno[x]['user']].avatar;
        apd['key'] = this.state.anno[x]['key'];
        sections.push(apd);
      }
      var user = firebase.auth().currentUser;
      var team = this.state.all_user[user.uid].team;
      // var team =2;
     
      for(var x in meet){
        // console.log();
        var apd={}
        if (team == 15){
          for( var mhead = 1 ; mhead<15 ; mhead++ ){
            if(mhead in meet[x]){
              apd['meeting'] = 1;
              console.log(mhead);
              apd['date'] = meet[x][mhead].date;
              apd['venue'] = meet[x][mhead].venue;
              apd['title'] = meet[x][mhead].title;
              apd['createdAt'] = meet[x]['createdAt'];
              apd['time'] = meet[x][mhead].time;
              apd['description'] = meet[x][mhead].description;
              apd['head'] = this.state.all_user[this.state.meet[x][mhead]['user']].name;
              apd['tid'] = this.state.all_user[this.state.meet[x][mhead]['user']].team;
              apd['avatar'] = this.state.all_user[this.state.meet[x][mhead]['user']].avatar;
              apd['key'] = this.state.meet[x]['key'];
              apd['link'] = this.state.meet[x]['link'];
              sections.push(apd);
              break;
            }
          }

        }else 
        if(team in meet[x]){
          apd['meeting'] = 1;
          apd['date'] = meet[x][team].date;
          apd['venue'] = meet[x][team].venue;
          apd['title'] = meet[x][team].title;
          apd['createdAt'] = meet[x]['createdAt'];
          apd['time'] = meet[x][team].time;
          apd['description'] = meet[x][team].description;
          apd['head'] = this.state.all_user[this.state.meet[x][team]['user']].name;
          apd['tid'] = this.state.all_user[this.state.meet[x][team]['user']].team;
          apd['avatar'] = this.state.all_user[this.state.meet[x][team]['user']].avatar;
          apd['key'] = this.state.meet[x]['key'];
          apd['link'] = this.state.meet[x]['link'];
          sections.push(apd);
        }
      }
      //console.log(sections);
      sections.sort(function(a, b) {return b.createdAt.seconds - a.createdAt.seconds}); 
      this.setState({
        sections,
        loading: false,
     });
      console.log(sections);
    }


    logout = () => {
        firebase
        .auth()
        .signOut()
        .then(function() {
          BackHandler.exitApp();
        })
        .catch(function(error) {
          // this.props.navigation.navigate('SignUp');
          BackHandler.exitApp();
        })
    }

    static navigationOptions = {  
        title: 'Home',  
        headerStyle: {  
            backgroundColor: '#ffffff',  
        },  
        //headerTintColor: '#0ff',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        }, 
        headerRight: () => (
          <ToolbarDropdown/>
          
        ), 
 
    } 
    
    render() {  
      const actions = [
      {
        text: "Schedule Meeting",
        icon: require("../../assets/icons/clipboard.png"),
        name: "load1",
        position: 1,
        color: '#FFBC61'
      },
      {
        text: "Announce",
        icon: require("../../assets/icons/g78.png"),
        name: "load2",
        position: 2,
        color:"#3D9BE9",
      }
    ];
      if (this.state.loading) {
        return <ActivityIndicator size="large" />;
      }
        return (  
                
            
            <View style={{flex: 1}}>
            <ScrollView 
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}/>}
            >
                <View style={{ flexDirection: "column",}}>
                <LAE SECTIONS = {this.state.sections} />
                </View>
            </ScrollView>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
            
                
            <FloatingAction actions={actions} position="right" color="#3366FF"
            onPressItem={(name)=>{
              if (name=='load1') {
                this.props.navigation.navigate('Third');
              }else{
                this.props.navigation.navigate('Second');
              }
            }}
          />
            </View> 
            </View>
        );  
    }  
}  

const styles = StyleSheet.create({
  button: {
    width: 192,
    position: 'absolute',
    flex: 1,
    
      },

});

