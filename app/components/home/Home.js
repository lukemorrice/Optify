import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import Utils from './Utils';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchProfile} from '../../actions/ProfileActions';
import {fetchGoals} from '../../actions/GoalsActions';
import Goal from './GoalItem';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

class Home extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
    day: '',
    date: '',
    greeting: '',
    goalsList: [],
  };

  componentDidMount() {
    this.props.fetchProfile();
    this.props.fetchGoals();
    var utils = new Utils();
    var greeting = utils.getGreeting();
    var day = utils.getDay();
    var date = utils.getDate();
    this.setState({day, date, greeting});
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
        });
      }
    }
  }

  sortByCompleted = (list) => {
    return list.sort((x, y) => x.completed - y.completed);
  };

  renderGoals = (goal, index) => {
    return (
      <Goal
        goals={this.state.goalsList.slice(0, parseInt(this.state.goals))}
        goal={goal}
        index={index}
        updateGoals={this.updateGoals}
      />
    );
  };

  updateGoals = (newGoalsList) => {
    this.setState({goalsList: this.sortByCompleted(newGoalsList)});
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    if (!this.state.firstName || !this.state.goalsList[0]) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Home</Text>
            <View style={styles.date}>
              <Text style={styles.day}>{this.state.day}</Text>
              <Text style={styles.dateText}>{this.state.date}</Text>
            </View>
          </View>

          <View style={styles.subHeader}>
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>
                {this.state.greeting} {this.state.firstName}!
              </Text>
              <Text style={styles.greetingText}>
                Here {this.state.goals > 1 ? 'are' : 'is'} your{' '}
                {this.state.goals} {this.state.goals > 1 ? 'goals' : 'goal'} for
                today
              </Text>
            </View>
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="ios-menu" size={40}></Icon>
            </TouchableOpacity>
          </View>

          <View style={styles.goalsContainer}>
            <FlatList
              data={this.state.goalsList.slice(0, parseInt(this.state.goals))}
              renderItem={({item, index}) => this.renderGoals(item, index)}
              keyExtractor={(item) => item.title}
            />
          </View>
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
    backgroundColor: '#F9F9F9',
  },
  headerContainer: {
    marginTop: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 3,
    color: '#000000',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  greeting: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '500',
  },
  goalsContainer: {
    marginTop: 30,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  goal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 300,
    height: 60,
  },
  goalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
