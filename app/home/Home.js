import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  RefreshControl,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {FlatList} from 'react-native-gesture-handler';
import Goal from './components/GoalItem';
import Greeting from './components/Greeting';
import Date from './components/Date';
import Header from './components/Header';
import ModalScreen from './Modal';
import CongratsMsg from './components/Congrats';

class Home extends Component {
  state = {
    showDescription: [],
    isModalVisible: false,
    refreshing: false,
  };

  toggleDescription = (index) => {
    this.state.showDescription[index] = !this.state.showDescription[index];
    this.setState({showDescription: this.state.showDescription});
  };

  toggleVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  toggleGoalCompleted = (idx) => {
    this.props.toggleGoalCompleted(idx);
  };

  renderGoals = (goal, index) => {
    return (
      <Goal
        goal={goal}
        index={index}
        toggleDescription={this.toggleDescription}
        showDescription={this.state.showDescription}
        toggleGoalCompleted={this.toggleGoalCompleted}
      />
    );
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

  render() {
    LayoutAnimation.easeInEaseOut();
    var firstName = this.props.profile.firstName;
    var goalsList = this.props.goalsList;
    var goals = goalsList.length;
    var allGoalsCompleted =
      this.props.goalsList.filter((goal) => goal.completed).length ==
        this.props.goalsList.length && this.props.goalsList.length >= 1;

    return (
      <View style={styles.container}>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <View style={styles.headerContainer}>
            <Header
              navigation={this.props.navigation}
              toggleVisible={this.toggleVisible}
            />
          </View>
          <View style={styles.dateContainer}>
            <Date />
          </View>
        </View>

        <View style={styles.content}>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <View style={styles.greetingContainer}>
              <Greeting name={firstName} />
            </View>

            <View style={styles.goalHeading}>
              <Text style={styles.goalHeadingText}>
                Today's {goals > 1 ? 'goals' : 'goal'}
              </Text>
            </View>

            {allGoalsCompleted ? <CongratsMsg /> : <View />}
          </View>

          <View style={{marginLeft: 15, marginRight: 15}}>
            <FlatList
              data={goalsList}
              renderItem={({item, index}) => this.renderGoals(item, index)}
              keyExtractor={(item) => item.title}
              style={{height: allGoalsCompleted ? 485 : 540}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.refreshGoals()}
                  tintColor="#808B96"
                />
              }
            />

            <ModalScreen
              isVisible={this.state.isModalVisible}
              toggleVisible={this.toggleVisible}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48C9B0',
  },
  headerContainer: {
    marginTop: 70,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F9F9F9',
  },
  dateContainer: {
    marginTop: 15,
  },
  greetingContainer: {
    marginTop: 30,
  },
  goalHeading: {
    marginTop: 35,
    marginBottom: 10,
  },
  goalHeadingText: {
    fontSize: 24,
    fontWeight: '600',
  },
});
