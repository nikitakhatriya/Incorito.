import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';
import { Input } from '@ui-kitten/components';

class Inputbox extends React.Component {
  state = {
    modalVisible: false,
    note: '',
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  handlerNote = (text) => {
    this.setState({note: text})
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.container}>
            <View>
               <Input 
                  style={styles.input}
                  label='new task'
                  size='small'
                  placeholder='Add Your Task Here'
                  value={this.state.text}
                  onChangeText={this.handlerNote}
                />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <FAB
          style={styles.fab}
          medium
          icon="plus"
          onPress={() => {this.setModalVisible(true); }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  TextInput: {

  }

});
export default Inputbox;