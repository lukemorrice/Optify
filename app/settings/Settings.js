import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  StatusBar,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import AccountDetails from './components/AccountDetails';
import GoalsSelector from './components//GoalsSelector';
import CategorySelector from './components/CategorySelector';

class Settings extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  onPressDone = () => {
    StatusBar.setBarStyle('dark-content', true);
    this.props.closeModal();
  };

  updateGoalsForNewCategory = (newCategories) => {
    const goals = this.props.profile.goalsList;
    this.props.changeGoalsAfterCategoryUpdate(goals, newCategories);
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    var firstName = this.props.profile.firstName;
    var lastName = this.props.profile.lastName;
    var email = this.props.profile.email;
    var goals = this.props.profile.goals;
    var categories = this.props.profile.categories;

    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Settings</Text>
            <TouchableOpacity onPress={() => this.onPressDone()}>
              <Text style={{fontSize: 17}}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settings}>
            <AccountDetails
              firstName={firstName}
              lastName={lastName}
              email={email}
            />

            <GoalsSelector goals={goals} updateGoals={this.props.updateGoals} />

            <CategorySelector
              updateCategories={this.props.updateCategories}
              categories={categories}
              updateGoals={this.updateGoalsForNewCategory}
            />
          </View>

          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.logoutUser()}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(Settings);

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
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000000',
  },
  settings: {
    flexDirection: 'column',
    marginTop: 10,
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: 100,
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
