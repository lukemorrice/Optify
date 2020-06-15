import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import Home from './Home';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {fetchProfile} from '../actions/profile';
import {
  fetchGoals,
  updateUserGoals,
  toggleGoalCompleted,
} from '../actions/goals';
import {PRIMARY_COLOUR} from '../Style';

class HomeContainer extends Component {
  state = {
    goalsList: [],
  };

  componentDidMount() {
    this.props.fetchProfile();
    this.props.fetchGoals();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.goals.goals) {
        var goalsList = [];
        var dailyGoals = this.props.profile.dailyGoalsList;
        var goals = this.props.goals.goals;

        if (dailyGoals) {
          var newDailyGoals = [];
          for (var i = 0; i < dailyGoals.length; i++) {
            var goalTitles = goals.map((goal) => goal.title);
            if (goalTitles.includes(dailyGoals[i].title) == false) {
              var newGoal = dailyGoals[i];
              newGoal.completed = false;
              newDailyGoals = newDailyGoals.concat([dailyGoals[i]]);
            }
          }
          var goalsList = newDailyGoals.concat(goals);
        } else {
          var goalsList = goals;
        }

        this.props.updateUserGoals(goalsList);
        this.setState({goalsList});
      }
    }
  }

  toggleGoalCompleted = (idx) => {
    this.props.toggleGoalCompleted(idx, this.state.goalsList);
  };

  render() {
    if (this.props.profile) {
      return (
        <Home
          profile={this.props.profile}
          goalsList={this.state.goalsList}
          toggleGoalCompleted={this.toggleGoalCompleted}
          refreshGoals={this.props.fetchGoals}
        />
      );
    } else {
      return (
        <ActivityIndicator
          style={{height: '100%'}}
          color={PRIMARY_COLOUR}
          size="large"
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  goals: state.goals,
});

const mapDispatchToProps = {
  fetchProfile,
  fetchGoals,
  updateUserGoals,
  toggleGoalCompleted,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer),
);
