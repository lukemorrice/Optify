import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
  StatusBar,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {updateGoals, updateGoalsCategories} from '../../actions/ProfileActions';
import {logoutUser} from '../../actions/AuthActions';
import {changeGoalsAfterCategoryUpdate} from '../../actions/GoalsActions';
import AccountDetails from './AccountDetails';
import GoalsSelector from './GoalsSelector';
import CategorySelector from './CategorySelector';

class Settings extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
    categories: [],
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    this.setState({
      firstName: this.props.profile.firstName,
      lastName: this.props.profile.lastName,
      email: this.props.profile.email,
      goals: this.props.profile.goals,
      categories: this.props.profile.categories,
    });
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        firstName: this.props.profile.firstName,
        lastName: this.props.profile.lastName,
        email: this.props.profile.email,
        goals: this.props.profile.goals,
        categories: this.props.profile.categories,
      });
    }
  }

  onChangeGoals = (goal) => {
    this.props.updateGoals(goal);
  };

  onPressLogout = () => {
    this.props.logoutUser();
  };

  updateCategories = (categories) => {
    this.props.updateGoalsCategories(categories);
  };

  updateGoalsForNewCategory = (newCategories) => {
    const goals = this.props.profile.goalsList;
    this.props.changeGoalsAfterCategoryUpdate(goals, newCategories);
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    if (this.state.firstName === '' || this.state.lastName === '') {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Settings</Text>
            <TouchableOpacity onPress={() => this.props.closeModal()}>
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settings}>
            <AccountDetails
              firstName={this.props.profile.firstName}
              lastName={this.props.profile.lastName}
              email={this.props.profile.email}
            />

            <GoalsSelector
              goals={this.props.profile.goals}
              updateGoals={this.onChangeGoals}
            />

            <CategorySelector
              updateCategories={this.updateCategories}
              categories={this.props.profile.categories}
              updateGoals={this.updateGoalsForNewCategory}
            />
          </View>

          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onPressLogout.bind(this)}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

const SettingsComp = connect(mapStateToProps, {
  updateGoals,
  logoutUser,
  updateGoalsCategories,
  changeGoalsAfterCategoryUpdate,
})(Settings);
export default withNavigation(SettingsComp);

const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: '#F9F9F9',
    borderRadius: 40,
    height: 850,
  },
  headerContainer: {
    marginTop: 35,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
  done: {
    fontSize: 17,
    marginTop: 12,
  },
  settings: {
    flexDirection: 'column',
    marginTop: 10,
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: 130,
  },
  buttonContainer: {
    backgroundColor: '#48C9B0',
    alignItems: 'center',
    padding: 12,
    width: 350,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },
});
