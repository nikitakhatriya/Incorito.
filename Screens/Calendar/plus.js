import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text, 
  Button ,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
    Layout,
    Input ,
} from '@ui-kitten/components';
import { Dt , getT } from '../../components/timePicker'
import firebase, { database } from 'react-native-firebase'
import DatePicker from 'react-native-datepicker';

export default class plus extends Component{
    constructor(){
      super()
      this.state={text1:'',text2:'',date:''};
    }

    static navigationOptions={
      title: 'Add Event',
    };

    componentDidMount (){
      var mon = (this.props.navigation.state.params.date).slice(5,7);
      var dat = (this.props.navigation.state.params.date).slice(8,10);
      var yea = (this.props.navigation.state.params.date).slice(0,4);
      this.setState({date: dat+'-'+mon+'-'+yea});
    }

    Load=()=>{
      var uname = "";
      var uteam = "";
      if((this.state.text1).length>0&&(this.state.text2).length>0&&getT()!='Select Time'){
      console.log('Simple Button pressed');
      console.log(this.state.text1);
      console.log(this.state.text2);
      console.log(this.props.navigation.state.params.date);
      console.log((this.props.navigation.state.params.date).slice(0,4));
      console.log(getT());
      var user = firebase.auth().currentUser;
      let ref = firebase.firestore().collection('user').doc(user.uid);
        if(user){
          let getDoc = ref.get()
          .then( doc => {
            if(doc.exists){
              let data=doc.data();
              uname=data['name'];
              uteam=data['team'];
              var mon = (this.state.date).slice(3,5);
              var dat = (this.state.date).slice(0,2);
              var yea = (this.state.date).slice(6,10);
              var d=yea+'-'+mon+'-'+dat;

              var ref1 = firebase.firestore().collection('calendar').doc(yea).collection('month').doc(mon).collection('day').doc(dat+'E');
              let gd = ref1.get()
              .then( doc1 => {
                if(doc1.exists){
                  var data1=doc1.data();
                  console.log(data1);
                  console.log(Object.keys(doc1.data()).length+1);
                  let x = Object.keys(doc1.data()).length+1;
                  console.log("b");
                  var dbuser = firebase.firestore().collection('calendar').doc(yea).collection('month').doc(mon).collection('day').doc(dat+'E').update({
                    [x]:{
                      title: this.state.text1,
                      description: this.state.text2,
                      date: d,
                      Event_time: getT(),
                      user_name: uname,
                      user_team: uteam,
                    }
                  });
                }else{
                  console.log("a");
                  var dbuser = firebase.firestore().collection("calendar").doc(yea).collection("month").doc(mon).collection("day").doc(dat+'E').set({
                    1:{
                      title: this.state.text1,
                      description: this.state.text2,
                      date: d,
                      Event_time: getT(),
                      user_name: uname,
                      user_team: uteam,
                    }
                  });
                }
              })
              .catch(err => {
                console.log('Error getting document1', err);
              });
            }
          })
          .catch(err => {
            console.log('Error getting document2', err);
          });
          console.log('Pressed add event');
          this.props.navigation.navigate('First');
        }
      }else{
        alert("Fill All The Details");
      }
    }

    render(){
        return(
            <View style={styles.container1}>
              <ScrollView>
                <Text style={styles.simple}>Event Title</Text>
                <Input
                  style={styles.input}
                  placeholder='Enter Event Title'
                  onChangeText={(text) => this.setState({text1:text})}
                  value={this.state.text1}
                  placeholderTextColor={'#c7c7c7'}
                  onPress = {()=>{this.focus()}}
                />
                <Text style={styles.simple}>Description</Text>
                <View style={styles.textAreaContainer}>
                  <Input
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={(text) => this.setState({text2:text})}
                    maxLength={100}
                    placeholder="Enter Event Description"
                    placeholderTextColor={'#c7c7c7'}
                    onPress = {()=>{this.focus()}}
                  />
                </View>
                  <View style={{ flex:1 , flexDirection:'row'}}>
                    <View style={{marginLeft:0}}>
                      <View>
                        <Text style={styles.simple}>Time</Text>
                      </View>
                      <View style={{paddingLeft: 20}}>
                      <Dt/>
                      </View>
                    </View>
                    <View style={styles.d1}>
                      <View>
                        <Text style={styles.simple}>Date</Text>
                      </View>
                      <View style={{ marginTop: -2 , paddingLeft: 20}}>
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
                  <TouchableOpacity style = {styles.button1} onPress={this.Load}>
                    <Text style={styles.post}>ADD EVENT</Text>
                  </TouchableOpacity>
                </ScrollView>
            </View>
        )
    };
}

const styles=StyleSheet.create({
    text: {
      textAlign: 'left',
      borderColor: '#bbb',
      padding: 10,
      backgroundColor: '#eee'
    },
    head: {
      fontSize:25,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    card: {
      marginVertical: 5,
      marginHorizontal: 8,
    },
    simple: {
      //color:'#00ffff',
      marginHorizontal: 20,
      marginVertical: 10,
      fontSize:20,
      textAlign: 'left',
      //fontWeight: 'bold'
    },
    input: {
      marginHorizontal: 16,
      //marginVertical: 10,
      fontSize:15,
      //height: 40,
      backgroundColor: '#F0F1F3',
    },
    button :{
      marginHorizontal: 100,
      marginVertical: 60,
      fontSize:20,
      textAlign: 'center',
      height: 40,
    },
    area :{
      fontSize:15,
      marginHorizontal: 20,
      marginVertical: 10,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:'#409EEC',
      justifyContent: "center",
      alignItems: "stretch",
      borderRightWidth: 1,
      borderLeftWidth: 1,
    },
    container1: {
      flex: 1,
      backgroundColor: 'white'
    },
    textArea: {
      height: 170,
      justifyContent: "flex-start",
      backgroundColor: '#F0F1F3',
      marginHorizontal:16,
    },
    button1: {
      position: 'relative',
      margin: 60,
      alignItems: 'baseline',
      justifyContent: 'center',
      bottom: '5%',
      flexDirection: 'row',
      alignSelf: 'center',
      backgroundColor: '#0095FF',
      borderRadius: 4,
      padding: '3%',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
    post:{
      color: '#FFFFFF',
      fontSize: 15,
    },
    d1:{
      position:"absolute",
      right:20,
    },
});

export {plus}