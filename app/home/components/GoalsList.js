import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {PRIMARY_COLOUR, SECONDARY_COLOUR, WHITE} from '../../Style';
import Icon from 'react-native-vector-icons/Ionicons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {ThemeConsumer} from 'react-native-elements';

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

  renderListItem = (goal, index) => {
    const showDescription = this.props.showDescription[index];
    return (
      <View
        style={{
          backgroundColor: goal.completed ? PRIMARY_COLOUR : SECONDARY_COLOUR,
          borderRadius: 15,
          marginTop: index == 0 ? 0 : 20,
        }}>
        <TouchableOpacity onPress={() => this.props.toggleDescription(index)}>
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
          // alignItems: 'center',
          flex: 1,
          marginTop: data.index !== 0 ? 20 : 0,
        }}>
        <View
          style={{
            width: 75,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'pink',
            height: 55,
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Left
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'red',
            width: 75,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            height: 55,
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Right
          </Text>
        </View>
      </View>
    );
  };

  render() {
    var goalsList = this.props.goalsList;
    return (
      <View style={{flex: 1, marginLeft: 15, marginRight: 15}}>
        <SwipeListView
          data={goalsList}
          renderItem={({item, index}) => this.renderListItem(item, index)}
          renderHiddenItem={(data) => this.renderHiddenItem(data)}
          recalculateHiddenLayout={true}
          swipeGestureBegan={(rowKey) =>
            this.props.closeDescription(parseInt(rowKey))
          }
          leftOpenValue={80}
          rightOpenValue={-80}
          leftActionValue={100}
          rightActionValue={-100}
          previewRowKey={
            this.props.goalsList.length > 0 ? this.props.goalsList[0].title : ''
          }
          previewOpenValue={80}
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
