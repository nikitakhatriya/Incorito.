import React from 'react';
import Swipeout from 'react-native-swipeout';
// import ListView from 'deprecated-react-native-listview';
import { View, StyleSheet } from 'react-native';
import {Text, Card} from '@ui-kitten/components';
import { Icon } from '@ui-kitten/components';

export const Seperator = () => {
  return(
    <View style={styles.seperator} />
    )
  }

class Todolist extends React.Component{
  removeItem(e) {
    this.props.deleteTask(e);     
    }

  render(){
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: '#ba110b',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {this.removeItem(this.props.pass_in_data) }
    }];
    return(
      <View style={styles.container}>
        <Swipeout right={swipeBtns} autoClose={true} style={styles.swipeout}>
          <Card style={styles.card}>
             <View style={styles.textbox}>
               <Icon name='star' width={20} height={20} fill='#409EEC'/>
                <Text style={styles.text}>
                   {this.props.pass_in_data.val}
                </Text>
              </View>
          </Card>
        </Swipeout>
      </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:  0,
  },
  card: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  swipeout: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  content: {
    margin:  10,
    padding: 10,
  },
  seperator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  textbox: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 0,
      
  },
  text: {
    paddingLeft: 5,
    paddingRight: 3,
    fontSize: 15,
  },

});

export default Todolist;