import React, {Component} from 'react';
import Home from './Home';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {fetchProfile} from '../actions/profile';
import {
  fetchGoals,
  updateUserGoals,
  toggleGoalCompleted,
  addDailyGoal,
  resetGoals,
} from '../actions/goals';
import Loading from '../auth/Loading';

class HomeContainer extends Component {
  state = {
    goalsList: [],
    deletedGoals: [],
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
        var dailyGoalsTitles = dailyGoals.map((goal) => goal.title);
        goals = goals.filter((goal) => !dailyGoalsTitles.includes(goal.title));

        if (dailyGoals) {
          var newDailyGoals = [];
          for (var i = 0; i < dailyGoals.length; i++) {
            var goalTitles = goals.map((goal) => goal.title);
            var deletedGoals = this.state.deletedGoals;
            if (
              goalTitles.includes(dailyGoals[i].title) == false &&
              !deletedGoals.includes(dailyGoals[i])
            ) {
              var newGoal = dailyGoals[i];
              newDailyGoals = newDailyGoals.concat([newGoal]);
            }
          }
          var goalsList = newDailyGoals.concat(goals);
        }

        this.setState({goalsList});
      }
    }
  }

  toggleGoalCompleted = (idx) => {
    this.props.toggleGoalCompleted(idx, this.state.goalsList);
  };

  addDailyGoal = (goal) => {
    var dailyGoals = this.props.profile.dailyGoalsList;
    const dailyGoalsTitles = dailyGoals.map((goal) => goal.title);
    if (!dailyGoalsTitles.includes(goal.title)) {
      this.props.addDailyGoal(
        goal.title,
        goal.description,
        true,
        goal.completed,
      );
    }
  };

  removeGoalFromList = (goal) => {
    var goalsList = this.state.goalsList;
    goalsList = goalsList.filter((item) => item.title !== goal.title);
    this.props.updateUserGoals(goalsList);
  };

  removeGoalForever = (goal) => {
    console.log("This goal won't be suggested to the user again:", goal.title);
  };

  render() {
    if (this.props.profile) {
      return (
        <Home
          profile={this.props.profile}
          goalsList={this.state.goalsList}
          toggleGoalCompleted={this.toggleGoalCompleted}
          refreshGoals={() => this.props.fetchGoals}
          navigation={this.props.navigation}
          addDailyGoal={this.addDailyGoal}
          removeGoalFromList={this.removeGoalFromList}
          removeGoalForever={this.removeGoalForever}
          resetGoals={() => this.props.resetGoals()}
        />
      );
    } else {
      return <Loading />;
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
  addDailyGoal,
  resetGoals,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(HomeContainer),
);
