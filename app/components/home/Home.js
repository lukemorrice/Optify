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
import {fetchProfile} from '../../actions/ProfileActions';
import Goal from './GoalItem';
import {FlatList} from 'react-native-gesture-handler';
import data from './goals';

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
    var utils = new Utils();
    var greeting = utils.getGreeting();
    var day = utils.getDay();
    var date = utils.getDate();
    this.setState({day, date, greeting});
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        firstName: this.props.profile.firstName,
        lastName: this.props.profile.lastName,
        email: this.props.profile.email,
        goals: this.props.profile.goals,
        goalsList: data.splice(0, this.state.goals),
      });
    }
  }

  renderGoals = (goal, index) => {
    return (
      <Goal
        goals={this.state.goalsList}
        goal={goal}
        index={index}
        updateGoals={this.updateGoals}
      />
    );
  };

  updateGoals = (newGoalsList) => {
    this.setState({goalsList: newGoalsList});
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    if (this.state.firstName === '' || this.state.lastName === '') {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Home</Text>
          <View style={styles.date}>
            <Text style={styles.day}>{this.state.day}</Text>
            <Text style={styles.dateText}>{this.state.date}</Text>
          </View>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.greetingText}>
            {this.state.greeting} {this.props.profile.firstName}!
          </Text>
          <Text style={styles.greetingText}>
            Here {this.state.goals > 1 ? 'are' : 'is'} your {this.state.goals}{' '}
            {this.state.goals > 1 ? 'goals' : 'goal'} for today
          </Text>
        </View>

        <View style={styles.goalsContainer}>
          <FlatList
            data={this.state.goalsList}
            renderItem={({item, index}) => this.renderGoals(item, index)}
            keyExtractor={(item) => item.title}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

const HomeComp = connect(mapStateToProps, {fetchProfile})(Home);
export default withNavigation(HomeComp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerContainer: {
    marginTop: 75,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
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
    marginLeft: 20,
    marginTop: 15,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '500',
  },
  goalsContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
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
