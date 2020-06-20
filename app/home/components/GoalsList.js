import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {PRIMARY_COLOUR, SECONDARY_COLOUR} from '../../Style';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
};

export default class GoalsList extends Component {
  state = {
    refreshing: false,
  };

  toggleCompleted = (idx) => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    if (this.props.showDescription[idx]) {
      this.props.toggleDescription(idx);
    }
    this.props.toggleGoalCompleted(idx);
  };

  wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  refreshGoals = () => {
    this.setState({refreshing: true});
    this.wait(600)
      .then(() => this.props.refreshGoals())
      .then(() => this.setState({refreshing: false}));
  };

  onSwipeStar = (state) => {
    if (state.isActivated) {
      ReactNativeHapticFeedback.trigger('impactMedium', options);
      // const index = parseInt(state.key);
      // const goal = this.props.goalsList[index];
      // this.props.addDailyGoal(goal);
    }
  };

  onSwipeDelete = (state) => {
    if (state.isActivated) {
      ReactNativeHapticFeedback.trigger('impactMedium', options);
      const index = parseInt(state.key);
      this.onPressDelete(index);
    }
  };

  onPressStar = (rowIndex) => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    const goal = this.props.goalsList[rowIndex];
    // this.props.addDailyGoal(goal);
  };

  onPressDelete = (rowIndex) => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    const goal = this.props.goalsList[rowIndex];
    Alert.alert(
      'Remove Goal',
      "Do you want to remove this goal from today's list, or delete it entirely?",
      [
        {
          text: 'Delete for today',
          onPress: () => this.props.removeGoalFromList(goal),
        },
        {
          text: 'Delete forever',
          onPress: () => this.props.removeGoalForever(goal),
        },
        {text: 'Cancel', onPress: () => console.log('Cancelled action')},
      ],
      {cancelable: true},
    );
  };

  renderListItem = (goal, index, rowMap) => {
    const showDescription = this.props.showDescription[index];
    return (
      <View
        style={{
          backgroundColor: goal.completed ? PRIMARY_COLOUR : SECONDARY_COLOUR,
          borderRadius: 15,
          marginTop: index == 0 ? 0 : 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            rowMap[index.toString()].closeRow();
            this.props.toggleDescription(index);
          }}>
          <View
            style={{
              height: showDescription ? 100 : 55,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.goalText}>{goal.title}</Text>
              <TouchableOpacity onPress={() => this.toggleCompleted(index)}>
                <Icon
                  name={
                    goal.completed
                      ? 'ios-checkmark-circle'
                      : 'ios-checkmark-circle-outline'
                  }
                  size={40}
                  style={{marginRight: 10}}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            {showDescription ? (
              <View style={styles.description}>
                <Text style={styles.descriptionText}>{goal.description}</Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderHiddenItem = (data) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          marginTop: data.index !== 0 ? 20 : 0,
        }}>
        <TouchableOpacity onPress={() => this.onPressStar(data.index)}>
          <View
            style={{
              width: 70,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFD740',
              height: 55,
            }}>
            <Icon name="ios-star" size={32} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPressDelete(data.index)}>
          <View
            style={{
              backgroundColor: '#FF1744',
              width: 70,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
            }}>
            <Icon name="ios-trash" size={36} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    var goalsList = this.props.goalsList;
    var numberOfGoals = goalsList.length - 1;
    return (
      <View style={{flex: 1, marginLeft: 15, marginRight: 15}}>
        <SwipeListView
          data={goalsList}
          renderItem={(rowData, rowMap) =>
            this.renderListItem(rowData.item, rowData.index, rowMap)
          }
          renderHiddenItem={(data) => this.renderHiddenItem(data)}
          swipeGestureBegan={(rowKey) =>
            this.props.closeDescription(parseInt(rowKey))
          }
          leftOpenValue={75}
          rightOpenValue={-75}
          leftActionValue={75}
          rightActionValue={-75}
          leftActivationValue={250}
          rightActivationValue={-200}
          onLeftActionStatusChange={(state) => this.onSwipeStar(state)}
          onRightActionStatusChange={(state) => this.onSwipeDelete(state)}
          stopLeftSwipe={300}
          previewRowKey={numberOfGoals > 0 ? numberOfGoals.toString() : ''}
          previewOpenValue={75}
          keyExtractor={(item) => this.props.goalsList.indexOf(item).toString()}
          style={{marginBottom: 5}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refreshGoals()}
              tintColor="#808B96"
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 15,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 10,
  },
  descriptionText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    width: '100%',
  },
  swipeView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 80,
    borderRadius: 15,
    marginBottom: 20,
  },
  swipeText: {
    color: 'white',
    fontSize: 16,
  },
});
