import React, {Component} from 'react';
import {Text, ActivityIndicator} from 'react-native';
import AddGoal from './AddGoal';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {updateUserGoals} from '../actions/goals';
import {PRIMARY_COLOUR} from '../Style';

class AddGoalContainer extends Component {
  state = {
    goals: [],
  };

  componentDidMount() {
    var dailyGoals = this.props.profile.dailyGoalsList;
    var customGoals = this.props.profile.customGoalsList;
    var goals = dailyGoals.concat(customGoals);
    this.setState({goals});
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.profile) {
        var dailyGoals = this.props.profile.dailyGoalsList;
        var customGoals = this.props.profile.customGoalsList;
        var goals = dailyGoals.concat(customGoals);
        this.setState({goals});
      }
    }
  }

  render() {
    if (this.props.goals) {
      return <AddGoal customGoals={this.state.goals} />;
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

const mapDispatchToProps = {};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(AddGoalContainer),
);
