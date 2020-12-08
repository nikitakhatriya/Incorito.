import React from 'react';
import {
  StyleSheet,
  View,ActivityIndicator,
} from 'react-native';
import {
  Button,
  Layout,
  Text
} from '@ui-kitten/components';
import Contactcard from '../../components/contact'
import { ScrollView } from 'react-native-gesture-handler';

class ContactUs1 extends React.Component{

  constructor() {
      super();
      this.state = {
        posts: [],
        loading: true,
      };
    }

  componentDidMount(){
    const {state} = this.props.navigation;
    console.log("PROPS " + state.params.text);
    const posts = [];
    for (var x in state.params.text){
      const name = state.params.text[x]["name"];
      const email = state.params.text[x]["email"];
      const contact = state.params.text[x]["contact"];
      posts.push({
        key : x ,
        name, email, contact,
      });
    }
    this.setState({
        posts,
        loading: false,
     });
  }

  static navigationOptions = {  
        title: 'Contacts',  
        headerStyle: {  
            backgroundColor: '#ffffff',  
        },  
        //headerTintColor: '#0ff',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
        },  
    };  

  render() {  

       let all_post = this.state.posts.map( (data, index) => {
        return (
              <Contactcard key={data.key} pass_in_data={data} />
          )
      })
        return (
          <React.Fragment> 
            <ScrollView> 
             {all_post}
            </ScrollView>
          </React.Fragment>
        );  
    }  
}
export default ContactUs1

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});




