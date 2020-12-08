import React,{ Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Input ,
} from '@ui-kitten/components';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BackdropProvider from '@mgcrea/react-native-backdrop-provider';
import {BackdropContext} from '@mgcrea/react-native-backdrop-provider';
import {
  Select,
  Layout,
} from '@ui-kitten/components';
import DatePicker from 'react-native-datepicker';
import { FAB } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Dt , getT } from '../../components/timePicker'

import firebase from 'react-native-firebase';
import Textarea from 'react-native-textarea';



// this.items = [
//   { id: '1', name: 'All team' },
//   { id: '2', name: 'All Core Team' },
//   { id: '3', name: 'Techolympics' },
//   { id: '4', name: 'Lecture Series' },
//   { id: '5', name: 'Media' },
//   { id: '6', name: 'Robotics' },
//   { id: '7', name: 'Creatives' },
//   { id: '8', name: 'Webops' },
//   { id: '9', name: 'Corporate' },
//   { id: '10', name: 'Nexus' },
//   { id: '11', name: 'Initiatives' },
//   { id: '12', name: 'Branding' },
//   { id: '13', name: 'Marketing' },
// ];

 
  
const items = [
      {
        name: 'Corporate',
        id: 6,
      },
      {
        name: 'Nexus',
        id: 7,
      },
      {
        name: 'Techolympics',
        id: 5,
      },
      {
        name: 'Techexpo',
        id: 2,
      },
      {
        name: 'Robotics',
        id: 3,
      },
      {
        name: 'Workshop',
        id: 4,
      },
      {
        name: 'LS',
        id: 8,
      },
      {
        name: 'Initiatives',
        id: 11,
      },
      {
        name: 'Technothlon',
        id: 13,
      },
      {
        name: 'Branding',
        id: 1,
      },
      {
        name: 'Creatives',
        id: 10,
      },
      {
        name: 'Marketing',
        id: 9,
      },
      {
        name: 'Media',
        id: 12,
      },
      {
        name: 'Webops',
        id: 14,
  },
];
export default class Meeting extends Component{
  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    //Set Selected Items
  };
  
  state ={
    selectedItems: [],
  }

  constructor(){
    super()

    this.state = {
      title: "",
      venue:"",
      time:"",
      description:"",
      date:"",
      isOpen:false,
      selectedItems: [],
      author_team: "",
      author_name: "",
      
    }
    this.state.customStyles={
      color : 'red',
    }
    //this.handleChangeText = this.handleChangeText.bind(this) //the context of this might change but bind keeps it in this class only
    //controlled(more powerful but we update a lot more tha we need to) and uncontrolled componenets ...
    onSelectedItemsChange = (selectedItems) => {
      this.setState({ selectedItems });
    };

  }

 
  Load=()=>{
    if((this.state.title).length>0&&(this.state.description).length>0&&(this.state.venue).length>0&&(this.state.date).length>0&&(this.state.selectedItems).length>0&&getT()!='Select Time'){
      console.log(this.state.date);
      var user = firebase.auth().currentUser;
      var posts = {};
      let db_meeting = firebase.firestore().collection("team_meet").doc();
      let db_notif_meeting = firebase.firestore().collection("notif_meeting");
      let db_calendar = firebase.firestore().collection("calendar");

        if(user){
          let ref_user = firebase.firestore().collection('user').doc(user.uid);
          ref_user.get()
          .then(doc => {
            if(doc.exists){
              let u_data = doc.data();
              this.state.author_team = u_data["team"];
              this.state.author_name = u_data["name"];
              for (var x in this.state.selectedItems){
                var dd = this.state.selectedItems[x].toString();
                let value = {
                        user: doc.id,
                        "description": this.state.description,
                        "title": this.state.title,
                        "date": this.state.date,
                        "time": getT(),
                        "team": this.state.selectedItems[x],
                        "venue": this.state.venue,
                      } ;
                posts[dd] = value;
                posts["createdAt"] = firebase.firestore.FieldValue.serverTimestamp();
                db_notif_meeting.doc(dd).set({
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  "author": this.state.author_name,
                  "by_team": this.state.author_team,
                  "description": this.state.description,
                  "title": this.state.title,
                  "date": this.state.date,
                  "time": getT(),
                  "team": this.state.selectedItems[x],
                  "venue": this.state.venue,
                })
              }
              var dat = (this.state.date).slice(0,2)+'M';
              var mon  = (this.state.date).slice(3,5);
              var yea = (this.state.date).slice(6,10);
              console.log(yea);
              console.log(mon);
              console.log(dat);
              var rrr = firebase.firestore().collection('calendar').doc(yea).collection('month').doc(mon).collection('day').doc(dat);
              let gd = rrr.get()
              .then( doc1 => {
                if(doc1.exists){
                  var data1=doc1.data();
                  console.log(data1);
                  console.log(Object.keys(doc1.data()).length+1);
                  let x = Object.keys(doc1.data()).length+1;
                  console.log("b");
                  var dbuser = firebase.firestore().collection('calendar').doc(yea).collection('month').doc(mon).collection('day').doc(dat).update({
                    [x]:{
                      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                      "author": this.state.author_name,
                      "by_team": this.state.author_team,
                      "description": this.state.description,
                      "title": this.state.title,
                      "date": this.state.date,
                      "time": getT(),
                      "team": this.state.selectedItems[x],
                      "venue": this.state.venue,
                    }
                  });
                }else{
                  console.log("a");
                  var dbuser = firebase.firestore().collection("calendar").doc(yea).collection("month").doc(mon).collection("day").doc(dat).set({
                    1:{
                      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                      "author": this.state.author_name,
                      "by_team": this.state.author_team,
                      "description": this.state.description,
                      "title": this.state.title,
                      "date": this.state.date,
                      "time": getT(),
                      "team": this.state.selectedItems,
                      "venue": this.state.venue, 
                    }
                  });
                }
              })
              .catch(err => {
                console.log('Error getting document1', err);
              });
              db_meeting.set(posts);
            }
          })
          .catch(err => {
            console.log(err);
          });

      }

      console.log(this.state.title);
      console.log(this.state.venue);
      console.log(this.state.description);
      console.log(this.state.date);
      console.log(this.state.selectedItems);
      console.log(getT());
      console.log('Pressed add meeting');
      this.props.navigation.navigate('First');
    }
    else{
      alert("Fill All The Details");
    }
    
  }

  modalHeader(){
    return(
      <View style={[styles.label_view,{padding:10,fontSize:16, left:10}]}>
        <Text style={styles.labels}>
          Add Participants
        </Text>
      </View>
      )
  }

  renderSelectText = () => {
    const selectedItemObjects = this.state.selectedItems

    const selectText = selectedItemObjects.length
      ? 'Add Participants                                                                                                             '
      : 'Add Participants                                                                                                             '
    return <Text style={{ color: 'gray', fontSize: 12 }}>{selectText}</Text>
  }


 
  static navigationOptions={
      title: 'Schedule Meeting',
    };

  
  render(){
        const { selectedItems } = this.state;
        const selectedHours = this.state;
        const selectedMinutes = this.state;

    return(
      <View style={{flex: 1 , backgroundColor:'white',justifyContent: 'flex-start'}}>
            <ScrollView>

      <View style={styles.container}> 

        <View style={styles.label_view}>
        <Text style={styles.labels}>Meeting Title </Text>
        </View>
        <View  >
        <TextInput style={styles.input_field}
          placeholder= "Enter Meeting Title"
          onChangeText = { text => this.setState({title :text})}
         />
        </View>

        <View style={styles.label_view}>
        <Text style={styles.labels}>Description </Text>
        </View>
        <View>
            <Input
              style={styles.textArea}
              underlineColorAndroid="transparent"
              numberOfLines={10}
              multiline={true}
              onChangeText = { text => this.setState({description :text})}
              maxLength={100}
              placeholder="Enter Meeting Description"
              placeholderTextColor={'#c7c7c7'}
              onPress = {()=>{this.focus()}}
            />
        </View>

        <View style={styles.label_view}>
        <Text style={styles.labels}>Venue</Text>
        </View>
        <View  >
        <TextInput style={styles.input_field}
          placeholder = "Enter Venue here"
          onChangeText = { text => this.setState({venue :text})}
         />
        </View>
        
        <View style={styles.label_view}>
          <Text style={styles.labels}>Paticipants </Text>
        </View>

        <View style={{backgroundColor: '#F0F1F3'}}>
          <SectionedMultiSelect
            items={items}
            uniqueKey="id"
            selectText={<Text style={styles.subsubHeadText}>Add Meeting Participants</Text>}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedItems}
            showCancelButton
            hideSearch
            modalWithSafeAreaView
            headerComponent={this.modalHeader}
            renderSelectText={this.renderSelectText}
            colors={{ primary: '#3366FF', success: '#3366FF', text: '#3366FF', chipColor:'white'}}
            styles={{
            // chipText: {
            //   maxWidth: Dimensions.get('screen').width - 90,
            // },
            // itemText: {
            //   color: this.state.selectedItems.length ? 'black' : 'lightgrey'
            // },
            // selectedItemText: {
            //   color: 'blue',
            // },
      
            item: {
              paddingHorizontal: 10, backgroundColor:"#F0F1F3",
            },  
            selectedItem: {
              backgroundColor: 'rgba(0,0,0,0.1)',
              color:"#3366FF",
            },
            scrollView: { paddingHorizontal: 0 },
            separator: {height:0},
            container:{backgroundColor:"white" , height: 100,},
            chipContainer:{backgroundColor:"#3366FF"},
          }}
          />
        </View>
        <View style={{ flex:1 , flexDirection:'row'}}>
        <View>
          <View style={styles.label_view}>
            <Text style={styles.labels}>Time</Text>
          </View>
            <Dt />
          </View>

          <View style={{ right:10 , position:'absolute'}}>
           <View style={styles.label_view}>
            <Text style={styles.labels}>Date</Text>
          </View>
          <View style={{ marginTop: -2}}>
            <DatePicker
              style={{position: 'relative'}}
              date={this.state.date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="Select Date"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              maxDate="01-01-2070"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  height: 39,
                  backgroundColor: '#C5C5C5',
                  borderRadius: 3,
                  borderColor: 'white',
                },
                placeholderText: {
                  color:'white',
                },
                dateText:{
                  color: 'white',
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </View>
          </View>
        </View>
        </View>
        <TouchableOpacity style = {styles.button1} onPress={this.Load}>
          <Text style={styles.post}>SCHEDULE</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
      
      
      );

  }
}
const styles = StyleSheet.create({
  label_view:{
    height: 23,
    top: 2,
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 30,
    lineHeight: 24,
    margin:3,
    color: '#222B45',
  },
  select:{
    borderWidth:0.2,
    borderRadius : 5,
    borderStyle : 'solid',
    padding:2,
    margin:9,
  },
  input_field:{
    borderStartColor : 'red',
    borderWidth:0.2,
    borderRadius : 5,
    borderStyle : 'solid',
    backgroundColor : '#F0F1F3',
    opacity : 0.7,
  },
  description:{
    height:100,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal4: {
    height: 300,
  },
  labels:{
    position: 'absolute',
    fontFamily: 'Rubik',
    fontStyle: 'normal' ,
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: '#222B45',
  },
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    padding : 16,
    backgroundColor : '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:"#409EEC",
  },
  button: {
    backgroundColor: 'green',
    width: 300,
    marginTop: 16,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#d0d0d0',
  },
  selectedItem: {
    color: 'green',
  },
  selectedSubItemText: {
    color: 'green',
  },
    textArea: {
      height: 170,
      justifyContent: "flex-start",
      backgroundColor: '#F0F1F3',
    },
    subsubHeadText:{
      marginHorizontal: 12,
      marginVertical: 8,
      fontFamily: 'Rubik',
      fontSize: 12,
      color: '#7E899D',
    },
    button1: {
      position: 'relative',
      margin: 16,
      alignItems: 'baseline',
      bottom: -15,
      flexDirection: 'row',
      alignSelf: 'center',
      backgroundColor: '#3366FF',
      borderRadius: 4,
      padding: '3%',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
    post:{
      color: '#FFFFFF',
      fontSize: 15,
    },
});

