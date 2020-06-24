import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {
  updateGoals,
  updateCategories,
  updateSettings,
} from '../actions/profile';
import {logoutUser} from '../actions/authorisation';
import {changeGoalsAfterCategoryUpdate} from '../actions/goals';
import Settings from './Settings';
import {ActivityIndicator} from 'react-native';
import {PRIMARY_COLOUR, WHITE} from '../Style';

class SettingsContainer extends Component {
  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor(PRIMARY_COLOUR);
  }

  render() {
    StatusBar.setBarStyle('default', true);
    StatusBar.setBackgroundColor('black');

    if (this.props.profile) {
      return (
        <Settings
          profile={this.props.profile}
          updateGoals={this.props.updateGoals}
          logoutUser={this.props.logoutUser}
          updateCategories={this.props.updateCategories}
          changeGoalsAfterCategoryUpdate={
            this.props.changeGoalsAfterCategoryUpdate
          }
          closeModal={this.props.closeModal}
          navigation={this.props.navigation}
          updateSettings={this.props.updateSettings}
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
  updateGoals,
  logoutUser,
  updateCategories,
  changeGoalsAfterCategoryUpdate,
  updateSettings,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(SettingsContainer),
);
