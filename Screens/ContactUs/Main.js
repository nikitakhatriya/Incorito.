import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';
import firebase from 'react-native-firebase';
import ContactButton from '../../components/cb';


class ContactUs extends React.Component{

  constructor(props) {
    super(props);
    this.Load = this.Load.bind(this);
    this.ref = firebase.firestore().collection('user');
    this.unsubscribe = null;
    this.state = {
      details: [],
    };
    this.ids = "";
  }

  onCollectionUpdate = (querySnapshot) => {
      const details = [];
      querySnapshot.forEach((doc) => {
        const { name , email , contact , team } = doc.data();
        if(team === this.ids){
        details.push({
          key: doc.id, // Document ID
          name,
          email,
          contact
        });
        };
      });
      this.setState({
        details,
     });
      console.log(details)
      this.props.navigation.navigate('Second',{text:details})
    }


  Load(txt){

    this.ids = txt;
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);


  }
  static navigationOptions = {  
        title: 'Team Details',  
        headerStyle: {  
            backgroundColor: '#ffffff',  
        },  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        },  
    };  
  render(){
  return(
     <View style={{flex: 1 , backgroundColor:'#E5E5E5'}}>
 <ScrollView>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('14#_=_')}  >
          <Text style = {styles.text}>
               WebOps
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('13#_=_')}  >
          <Text style = {styles.text2}>
               Technothlon
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>

  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('1#_=_')}  >
          <Text style = {styles.text3}>
               Branding
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('10#_=_')}  >
          <Text style = {styles.text}>
               Creatives
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('8#_=_')}  >
          <Text style = {styles.text2}>
               LS
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('14#_=_')}  >
          <Text style = {styles.text3}>
               Media
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('7#_=_')}  >
          <Text style = {styles.text}>
               Nexus
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('2#_=_')}  >
          <Text style = {styles.text2}>
               TechExpo
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('6#_=_')}  >
          <Text style = {styles.text3}>
               Corporate
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('3#_=_')}  >
          <Text style = {styles.text}>
               Robotics
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('4#_=_')}  >
          <Text style = {styles.text2}>
               Workshop
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('5#_=_')}  >
          <Text style = {styles.text3}>
               Techolympics
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('11#_=_')}  >
          <Text style = {styles.text}>
              Initiative
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('9#_=_')}  >
          <Text style = {styles.text2}>
              Marketing
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>
  <Layout>
  <View style = {styles.container}>
         <TouchableHighlight onPress={() => this.Load('12#_=_')}  >
          <Text style = {styles.text3}>
              Media
            </Text>
         </TouchableHighlight>
      </View>
  </Layout>

  </ScrollView>
  </View>
   )
};
}
  
  
export default ContactUs

const styles = StyleSheet.create ({
   container: {
      alignItems: 'center',
      backgroundColor: '#E5E5E5',
      padding: 4,
      paddingLeft:20,
      paddingRight:20,
   },
   text: {
      borderWidth: 1,
      paddingTop: 11,
      paddingLeft:20,
      width: Dimensions.get('window').width-3,
      height:44,
      borderLeftWidth : 4,
      borderRightColor: 'white',
      borderBottomColor: 'white',
      borderTopColor: 'white',
      borderLeftColor : '#FFBC61' ,
      borderRadius:5,
      backgroundColor: 'white',
      color:'#FFBC61',
   },
   text2: {
      borderWidth: 1,
      height:44,
      paddingTop: 11,
      paddingLeft:20,
      width: Dimensions.get('window').width-3,
      borderLeftWidth : 4,
      borderRightColor: 'white',
      borderBottomColor: 'white',
      borderTopColor: 'white',
      borderLeftColor : '#3D9BE9',
      borderRadius:5,
      backgroundColor: 'white',
      color:'#3D9BE9',
   },
   text3: {
      borderWidth: 1,
      paddingTop: 11,
      paddingLeft:20,
      height:44,
      width: Dimensions.get('window').width-3,
      borderLeftWidth : 4,
      borderRightColor: 'white',
      borderBottomColor: 'white',
      borderTopColor: 'white',
      borderLeftColor : '#1EC6B2',
      borderRadius:5,
      backgroundColor: 'white',
      color:'#1EC6B2',
   }
})
