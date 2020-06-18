import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  SafeAreaView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Greeting from './components/Greeting';
import Date from './components/Date';
import Header from './components/Header';
import ModalScreen from './Modal';
import CongratsMsg from './components/Congrats';
import {PRIMARY_COLOUR} from '../Style';
import GoalsList from './components/GoalsList';

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

  render() {
    LayoutAnimation.easeInEaseOut();
    var firstName = this.props.profile.firstName;
    var goalsList = this.props.goalsList;
    var goals = goalsList.length;
    var allGoalsCompleted =
      this.props.goalsList.filter((goal) => goal.completed).length ==
        this.props.goalsList.length && this.props.goalsList.length >= 1;

    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 0, backgroundColor: PRIMARY_COLOUR}} />
        <View style={{flex: 1, backgroundColor: PRIMARY_COLOUR}}>
          <SafeAreaView style={{flex: 1, backgroundColor: '#F9F9F9'}}>
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Header
                  navigation={this.props.navigation}
                  toggleVisible={this.toggleVisible}
                />
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

                <GoalsList
                  goalsList={goalsList}
                  toggleGoalCompleted={this.toggleGoalCompleted}
                  toggleDescription={this.toggleDescription}
                  showDescription={this.state.showDescription}
                  refreshGoals={() => this.props.refreshGoals()}
                />

                <ModalScreen
                  isVisible={this.state.isModalVisible}
                  toggleVisible={this.toggleVisible}
                />
              </View>
            </View>
          </SafeAreaView>
          <View style={{backgroundColor: '#F9F9F9'}} />
        </View>
      </View>
    );
  }
}

export default withNavigation(Home);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: PRIMARY_COLOUR,
  },
  headerContainer: {
    marginTop: 5,
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F9F9F9',
    marginTop: 15,
  },
  dateContainer: {
    marginTop: 15,
  },
  greetingContainer: {
    marginTop: 30,
  },
  goalHeading: {
    marginTop: 35,
    marginBottom: 20,
  },
  goalHeadingText: {
    fontSize: 24,
    fontWeight: '600',
  },
});
