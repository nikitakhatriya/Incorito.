import React from 'react';
import firebase from 'react-native-firebase'
import { Avatar } from '@ui-kitten/components';
import { View, Text , BackHandler } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
 
class ToolbarDropdown extends React.PureComponent {
  _menu = null;

  constructor() {
      super();

      // need to bind `this` to access props in handler
      this.logout = this.logout.bind(this);
    }
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };

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
 
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}> <Avatar size='tiny' source={require('../assets/icons/more-vertical-outline.png')}/> </Text>}
        >
          <MenuItem onPress={() => this.logout()}>Sign Out</MenuItem>
          
          <MenuDivider />
          
        </Menu>
      </View>
    );
  }
}
 
export default ToolbarDropdown;

