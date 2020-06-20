import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import AddGoal from './AddGoal';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {addDailyGoal, addCustomGoal, removeCustomGoal} from '../actions/goals';
import {PRIMARY_COLOUR} from '../Style';

class AddGoalContainer extends Component {
  state = {
    goals: [],
  };

  componentDidMount() {
    var goals = [];
    var dailyGoals = this.props.profile.dailyGoalsList;
    if (dailyGoals) {
      goals = goals.concat(dailyGoals);
    }
    var customGoals = this.props.profile.customGoalsList;
    if (customGoals) {
      goals = goals.concat(customGoals);
    }
    this.setState({goals});
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.profile) {
        var goals = [];
        var dailyGoals = this.props.profile.dailyGoalsList;
        if (dailyGoals) {
          goals = goals.concat(dailyGoals);
        }
        var customGoals = this.props.profile.customGoalsList;
        if (customGoals) {
          goals = goals.concat(customGoals);
        }
        this.setState({goals});
      }
    }
  }

  render() {
    if (this.props.profile) {
      return (
        <AddGoal
          customGoals={this.state.goals}
          addDailyGoal={this.props.addDailyGoal}
          addCustomGoal={this.props.addCustomGoal}
          removeCustomGoal={this.props.removeCustomGoal}
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

const mapDispatchToProps = {addDailyGoal, addCustomGoal, removeCustomGoal};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(AddGoalContainer),
);
