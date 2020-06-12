import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {FlatList} from 'react-native-gesture-handler';
import {fetchProfile} from '../../actions/ProfileActions';
import {fetchGoals} from '../../actions/GoalsActions';
import * as firebase from 'firebase';
import Goal from './components/GoalItem';
import Greeting from './components/Greeting';
import Date from './components/Date';
import Header from './components/Header';
import HeaderNoIcon from './components/HeaderNoIcon';
import ModalScreen from './Modal';
import CongratsMsg from './components/Congrats';
import {PRIMARY_COLOUR} from '../design';

class Home extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
    goalsList: [],
    dailyGoalsList: [],
    completedGoals: '',
    showDescription: [false, false, false],
    isModalVisible: false,
    refreshing: false,
  };

  componentDidMount() {
    this.props.fetchProfile();
    this.props.fetchGoals();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.profile) {
        this.setState({
          firstName: this.props.profile.firstName,
          lastName: this.props.profile.lastName,
          email: this.props.profile.email,
          goals: this.props.profile.goals,
        });
      }
      if (this.props.goals.goals) {
        this.setState({
          goalsList: this.sortByCompleted(this.props.goals.goals),
          completedGoals: this.props.goals.goals.filter(
            (goal) => goal.completed,
          ).length,
        });
      }
      if (this.props.profile.dailyGoalsList) {
        this.setState({
          dailyGoalsList: this.props.profile.dailyGoalsList,
        });
      } else {
        this.setState({
          dailyGoalsList: [],
        });
      }
    }
  }

  navigateToAddGoal = () => {
    this.props.navigation.navigate('AddGoal');
  };

  updateGoals = (goalsList) => {
    goalsList = this.sortByCompleted(goalsList);
    this.setState({goalsList});
    const {currentUser} = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/profile`)
      .update({goalsList});
  };

  sortByCompleted = (list) => {
    return list.sort((x, y) => x.completed - y.completed);
  };

  toggleDescription = (index) => {
    this.state.showDescription[index] = !this.state.showDescription[index];
    this.setState({showDescription: this.state.showDescription});
  };

  renderGoals = (goal, index) => {
    return (
      <Goal
        goals={this.state.goalsList}
        goal={goal}
        index={index}
        updateGoals={this.updateGoals}
        toggleDescription={this.toggleDescription}
        showDescription={this.state.showDescription}
      />
    );
  };

  toggleVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  refreshGoals = () => {
    this.setState({refreshing: true});
    this.wait(600)
      .then(() => this.props.fetchGoals())
      .then(() => this.setState({refreshing: false}));
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <View style={styles.headerContainer}>
            {this.state.firstName ? (
              <Header
                navigation={this.props.navigation}
                toggleVisible={this.toggleVisible}
                navigateToAddGoal={this.navigateToAddGoal}
              />
            ) : (
              <HeaderNoIcon />
            )}
          </View>
          <View style={styles.dateContainer}>
            <Date />
          </View>
        </View>

        <View style={styles.content}>
          {this.state.firstName && this.state.goalsList[0] ? (
            <View>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <View style={styles.greetingContainer}>
                  {this.state.firstName ? (
                    <Greeting
                      name={this.state.firstName}
                      goals={this.state.goals}
                    />
                  ) : (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <ActivityIndicator size="large" color="#48C9B0" />
                    </View>
                  )}
                </View>

                <View style={styles.goalHeading}>
                  <Text style={styles.goalHeadingText}>
                    Today's {this.state.goals > 1 ? 'goals' : 'goal'}
                  </Text>
                </View>

                {this.state.completedGoals == this.state.goals ? (
                  <CongratsMsg />
                ) : (
                  <View />
                )}
              </View>

              <View style={{marginLeft: 15, marginRight: 15}}>
                <FlatList
                  data={this.state.dailyGoalsList.concat(this.state.goalsList)}
                  renderItem={({item, index}) => this.renderGoals(item, index)}
                  keyExtractor={(item) => item.title}
                  style={{height: 425}}
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
          ) : (
            <View
              style={{
                height: '75%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={PRIMARY_COLOUR} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  goals: state.goals,
});

const HomeComp = connect(mapStateToProps, {
  fetchProfile,
  fetchGoals,
})(Home);
export default withNavigation(HomeComp);

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
