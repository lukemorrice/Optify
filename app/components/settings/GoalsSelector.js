import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';

export default class GoalsSelector extends Component {
  onChangeGoals = (goal) => {
    this.props.updateGoals(goal);
  };

  render() {
    const {goals, onChangeGoals} = this.props;
    return (
      <View>
        <TouchableOpacity>
          <ModalSelector
            data={[
              {id: 1, name: '1'},
              {id: 2, name: '2'},
              {id: 3, name: '3'},
            ]}
            keyExtractor={(item) => item.id}
            labelExtractor={(item) => item.name}
            onChange={(option) => onChangeGoals(option.name)}>
            <View style={styles.row}>
              <Divider></Divider>
              <View style={styles.genSetting}>
                <Icon name={'ios-star'} size={24} color="green"></Icon>
                <Text style={styles.settingName}>Daily number of goals</Text>
                <Text style={styles.settingValue}>{goals}</Text>
              </View>
              <Divider></Divider>
            </View>
          </ModalSelector>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  genSetting: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingName: {
    fontSize: 16,
    marginRight: 150,
  },
  settingValue: {
    fontWeight: '700',
  },
  row: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 12,
  },
});
