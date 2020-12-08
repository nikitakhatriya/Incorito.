import React from 'react';
import { StyleSheet, View,Text} from 'react-native';
import { TextInput } from 'react-native-paper';
import { ListItem,CheckBox} from '@ui-kitten/components';

export default class AddToDo extends React.Component{    
    render(){
        const completed = false;
        return(                
            <ListItem>
                <View>
                    <TextInput placeholder = "What needs to be done?"                    
                        onChangeText = { (txt) => console.log(txt) }                    
                        onSubmitEditing = { () => console.log("Text Submited") }                                                                
                    />
                </View>
                <CheckBox
                    checked = { completed }
                    onPress = { () => console.log("set todo as completed") }
                 />
            </ListItem> 
        );
    }
}