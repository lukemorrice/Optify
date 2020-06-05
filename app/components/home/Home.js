import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {FlatList} from 'react-native-gesture-handler';
import {fetchProfile} from '../../actions/ProfileActions';
import {fetchGoals} from '../../actions/GoalsActions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
import Goal from './components/GoalItem';
import Greeting from './components/Greeting';
import Date from './components/Date';
import Header from './components/Header';
import HeaderNoIcon from './components/HeaderNoIcon';
import ModalScreen from './Modal';

class Home extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
    goalsList: [],
    completedGoals: '',
    showDescription: [false, false, false],
    isModalVisible: false,
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
    }
  }

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
        goals={this.state.goalsList.slice(0, parseInt(this.state.goals))}
        goal={goal}
        index={index}
        updateGoals={this.updateGoals}
        toggleDescription={this.toggleDescription}
        showDescription={this.state.showDescription}
      />
    );
  };

  updateGoals = (newGoalsList) => {
    this.setState({goalsList: this.sortByCompleted(newGoalsList)});
    const {currentUser} = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/profile`)
      .update({goalsList: this.sortByCompleted(newGoalsList)});
  };

  toggleVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
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
              />
            ) : (
              <HeaderNoIcon />
            )}
          </View>
        </View>

        <View style={styles.content}>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <View style={styles.dateContainer}>
              <Date />
            </View>
            <View style={styles.greetingContainer}>
              {this.state.firstName ? (
                <Greeting
                  name={this.state.firstName}
                  goals={this.state.goals}
                />
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" color="#48C9B0" />
                </View>
              )}
            </View>
            {this.state.firstName &&
            this.state.completedGoals == this.state.goals ? (
              <View style={styles.congrats}>
                <Text style={styles.congratsMsg}>
                  Nice job! All goals completed{' '}
                </Text>
                <View style={{backgroundColor: '#FFEB3B', borderRadius: 100}}>
                  <Icon
                    name="smile-beam"
                    size={25}
                    style={{borderRadius: 100}}
                  />
                </View>
              </View>
            ) : (
              <View style={{height: 10, marginTop: 25}} />
            )}
          </View>

          <View style={styles.goalHeading}>
            <View style={styles.goalDivider} />
            <Text style={styles.goalHeadingText}>
              Today's {this.state.goals > 1 ? 'goals' : 'goal'}
            </Text>
            <View style={styles.goalDivider} />
          </View>

          <View style={{marginLeft: 20, marginRight: 20}}>
            <View style={styles.goalsContainer}>
              {this.state.goalsList[0] ? (
                <FlatList
                  data={this.state.goalsList.slice(
                    0,
                    parseInt(this.state.goals),
                  )}
                  renderItem={({item, index}) => this.renderGoals(item, index)}
                  keyExtractor={(item) => item.title}
                  scrollEnabled={false}
                />
              ) : (
                <View
                  style={{
                    height: 300,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#48C9B0" />
                </View>
              )}
            </View>
          </View>

          <ModalScreen
            isVisible={this.state.isModalVisible}
            toggleVisible={this.toggleVisible}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  goals: state.goals,
});

const HomeComp = connect(mapStateToProps, {fetchProfile, fetchGoals})(Home);
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
    height: '84%',
    borderRadius: 40,
    backgroundColor: '#F9F9F9',
    paddingBottom: 300,
  },
  dateContainer: {
    marginTop: 50,
  },
  greetingContainer: {
    marginTop: 35,
  },
  goalsContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  goalHeading: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  goalHeadingText: {
    fontSize: 26,
    fontWeight: '600',
    paddingHorizontal: 25,
  },
  goalDivider: {
    backgroundColor: 'black',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  congrats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 25,
  },
  congratsMsg: {
    fontSize: 20,
  },
});
