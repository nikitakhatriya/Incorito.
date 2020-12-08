import React, {useState} from 'react';
import {View, Platform, StyleSheet, Button , Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

let x='';
let y='Select Time';
const Dt = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    x=currentDate.toLocaleString();
    y=x[11]+x[12]+':'+x[14]+x[15];
    setDate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View style={{width: 150}}>
        <Button color='#C5C5C5' onPress={showTimepicker} title={y}/>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const load=()=>{
  y='Select Time';
}

const getT=()=>{
  return y;
};

export { Dt ,getT ,load };