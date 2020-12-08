import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, View, Button , Platform, Linking, AsyncStorage } from 'react-native'

import firebase from 'react-native-firebase'


export default class Loading extends React.Component {

  

  state = { email: '', password: '', errorMessage: null , fname: '', lname: '', tid: '', mob: '', module: '', topic: '' , avatar:''}
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        // console.log("createuser")
        this.createuser()
      )
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  async handleLogin () {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("login");
        this.props.navigation.navigate('TabNavigator');
      })
      .catch(this.handleSignUp())
  }

  async createuser () {
    var user = firebase.auth().currentUser;
      if(user){
        var dbuser = firebase.firestore().collection("user").doc(user.uid).set({
          name: this.state.fname + " " + this.state.lname,
          email: this.state.email,
          contact: this.state.mob,
          T_id: this.state.tid,
          avatar: this.state.avatar,
          team: this.state.module,
        });
        this.props.navigation.navigate('TabNavigator');
      }
      else{
        console.log("not signed in");
        setInterval(() => {
          this.createuser(); 
        }, 1000);
      }
      
  }


  componentDidMount() {
    console.log("loading mounted");

    var userq = firebase.auth().currentUser;
    if(userq){
      firebase.messaging().subscribeToTopic(`all`);
      var detail = firebase.firestore().collection("user").doc(userq.uid);
      detail.get().then(function (doc){
        const val = doc.data();
        console.log(val.team);
        // this.state.module = val.team;
        if (val.team == "1") {
          firebase.messaging().subscribeToTopic('1'); //branding
          console.log("success");
        }
        if (val.team == "2") {
          firebase.messaging().subscribeToTopic('2'); //techexpo
        }
        if (val.team == "3") {
          firebase.messaging().subscribeToTopic('3'); //robotics
        }
        if (val.team == "4") {
          firebase.messaging().subscribeToTopic('4'); //workshop
        }
        if (val.team == "5") {
          firebase.messaging().subscribeToTopic('5'); //techolympics
        }
        if (val.team == "6") {
          firebase.messaging().subscribeToTopic('6'); //corp
        }
        if (val.team == "7") {
          firebase.messaging().subscribeToTopic('7'); //nexus
        }
        if (val.team == "8") {
          firebase.messaging().subscribeToTopic('8'); //ls
        }
        if (val.team == "9") {
          firebase.messaging().subscribeToTopic('9'); //marketing
        }
        if (val.team == "10") {
          firebase.messaging().subscribeToTopic('10'); //creatives
        }
        if (val.team == "11") {
          firebase.messaging().subscribeToTopic('11'); //initiatives
        }
        if (val.team == "12") {
          firebase.messaging().subscribeToTopic('12'); //media
        }
        if (val.team == "13") {
          firebase.messaging().subscribeToTopic('13'); //techno
        }
        if (val.team == "14") {
          firebase.messaging().subscribeToTopic('14'); //webops
        }
        if (val.team == "15") {
          firebase.messaging().subscribeToTopic('1'); //webops
          firebase.messaging().subscribeToTopic('2'); //webops
          firebase.messaging().subscribeToTopic('3'); //webops
          firebase.messaging().subscribeToTopic('4'); //webops
          firebase.messaging().subscribeToTopic('5'); //webops
          firebase.messaging().subscribeToTopic('6'); //webops
          firebase.messaging().subscribeToTopic('7'); //webops
          firebase.messaging().subscribeToTopic('8'); //webops
          firebase.messaging().subscribeToTopic('9'); //webops
          firebase.messaging().subscribeToTopic('10'); //webops
          firebase.messaging().subscribeToTopic('11'); //webops
          firebase.messaging().subscribeToTopic('12'); //webops
          firebase.messaging().subscribeToTopic('13'); //webops
          firebase.messaging().subscribeToTopic('14'); //webops
        }
        // firebase.messaging().subscribeToTopic(`${val.team}`);
      })
      this.props.navigation.navigate('TabNavigator')
    }
    else{
      this.props.navigation.navigate('SignUp')
    }
    
    if (Platform.OS === 'android') {
      Linking.getInitialURL()
      .then(url => {this.navigate(url)})
      .catch(console.log('NO URL'));
    } 
    else {
      Linking.addEventListener('url', this.ioshandleOpenURL);
    }
    
  }


  componentWillUnmount() { 
    console.log("loading unmounted");
    Linking.removeEventListener('url', this.ioshandleOpenURL);
    // this.notificationListener();
    // this.notificationOpenedListener();
  }

  ioshandleOpenURL = (event) => { 
    this.navigate(event.url);
  }
    navigate = (url) => { 
     const { navigate } = this.props.navigation;
      const route = url.replace(/.*?:\/\//g, '');
      const token = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('/')[0];
      const sep = token.split(';');
      console.log(sep[0]);
      
      if (routeName === 'coreteam') {
        console.log(url);
        let he = sep[5].split("$$");
        let last_split = sep[2].split("%20");
        let nml="";
        for(let x in last_split){ 
          nml = nml+" "+last_split[x];
        }
        this.state.email=sep[3]
        this.state.password=sep[0]
        this.state.tid=sep[0]
        this.state.fname=sep[1]
        this.state.lname=nml
        this.state.mob=sep[4]
        this.state.avatar= he[0]+"/"+he[1]+"/"+he[2]+"/"+he[3]+"/"+he[4];
        this.state.module=sep[6].split("#")[0]
        this.handleLogin();  
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})