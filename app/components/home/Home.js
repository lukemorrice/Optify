import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {FlatList} from 'react-native-gesture-handler';
import {fetchProfile} from '../../actions/ProfileActions';
import {fetchGoals} from '../../actions/GoalsActions';
import Goal from './components/GoalItem';
import Greeting from './components/Greeting';
import Date from './components/Date';
import Header from './components/Header';

class Home extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
    goalsList: [],
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
        <View style={{marginLeft: 20, marginRight: 20, marginBottom: 35}}>
          <View style={styles.headerContainer}>
            <Header navigation={this.props.navigation} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <View style={styles.dateContainer}>
              <Date />
            </View>

            <View style={styles.greetingContainer}>
              <Greeting name={this.state.firstName} goals={this.state.goals} />
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
    height: '85%',
    borderRadius: 40,
    backgroundColor: '#F9F9F9',
    paddingBottom: 300,
  },
  dateContainer: {
    marginTop: 45,
  },
  greetingContainer: {
    marginTop: 45,
  },
  goalsContainer: {
    marginTop: 45,
  },
});
