import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Layout,
  Text,
  Card,
  CardHeader,
} from '@ui-kitten/components';



export default class Contactcard extends React.Component {

render() {
    return(

<Layout>

    <Card style={styles.card} status='success'>
      <Text>
        {'\♔  '}  
        {this.props.pass_in_data.name}{"\n"}{'✉  '}
        {this.props.pass_in_data.email}{"\n"}{'✆  '}
        {this.props.pass_in_data.contact}
      </Text>
    </Card>

</Layout>
);
}
}
 


const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
   cardPost: {
    borderLeftColor : 'blue',
    borderLeftWidth : 4,
    padding: 6,
    height: 200,
  },
  card1: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 10,
  
  },
    

});
