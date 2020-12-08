import React from 'react';
import { StyleSheet, View ,Linking } from 'react-native'
import { Button, Icon } from '@ui-kitten/components'


export const FacebookIcon = (style) => (
  <Icon name='facebook' {...style} />
);

export default class LoginButton extends React.Component {
	render() {
    return(
    	
    	<View style ={styles.bottom}>

      		<Button icon={FacebookIcon} onPress={()=> Linking.openURL('https://techniche.org/oauth/login/facebook/?user_type=coreteam_app')}>Login with Facebook</Button>
      	</View>
      	
      )
  };
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:36
  }

})