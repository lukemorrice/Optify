import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GoalItems(props) {
  const goals = props.goals;

  if (goals == 1) {
    return <Goal goal="Goal 1" />;
  } else if (goals == 2) {
    return (
      <View>
        <Goal goal="Goal 1" />
        <View style={{marginVertical: 15}} />
        <Goal goal="Goal 2" />
      </View>
    );
  } else {
    return (
      <View>
        <Goal goal="Goal 1" />
        <View style={{marginVertical: 15}} />
        <Goal goal="Goal 2" />
        <View style={{marginVertical: 15}} />
        <Goal goal="Goal 3" />
      </View>
    );
  }
}

function Goal(props) {
  const text = props.goal;

  const [checkBox, setCheckBox] = useState(false);
  const [checkBoxValue, setCheckBoxValue] = useState(
    'ios-checkmark-circle-outline',
  );
  const [iconColour, setIconColour] = useState('#FF1744');
  const [goalColour, setGoalColour] = useState('#64B5F6');

  onPressCheckBox = (suppliedKey) => {
    setCheckBox(!checkBox);
    if (checkBox) {
      setCheckBoxValue('ios-checkmark-circle');
      setIconColour('#1ABC9C');
      setGoalColour('#1ABC9C');
    } else {
      setCheckBoxValue('ios-checkmark-circle-outline');
      setIconColour('#FF1744');
      setGoalColour('#64B5F6');
    }
  };

  return (
    <View style={styles.goalContainer}>
      <View style={[{backgroundColor: goalColour}, styles.goal]}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <TouchableOpacity onPress={() => this.onPressCheckBox()}>
        <Icon
          name={checkBoxValue}
          size={40}
          style={styles.checkbox}
          color={iconColour}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  goalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 300,
    height: 60,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  checkbox: {
    marginRight: 10,
  },
});
