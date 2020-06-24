import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import AccountDetails from './components/AccountDetails';
import GoalsSelector from './components//GoalsSelector';
import CategorySelector from './components/CategorySelector';
import {WHITE, PRIMARY_COLOUR} from '../Style';

class Settings extends Component {
  state = {
    numberOfGoals: '',
    categories: [],
    loading: false,
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    this.setState({
      numberOfGoals: this.props.profile.goals,
      categories: this.props.profile.categories,
    });
  }

  onPressDone = () => {
    StatusBar.setBarStyle('dark-content', true);
    const oldGoals = this.props.profile.goals;
    const newGoals = this.state.numberOfGoals;
    var updatedGoals = null;
    if (oldGoals !== newGoals) {
      updatedGoals = newGoals;
    }
    const prevCategories = this.props.profile.categories.sort();
    const currentCategories = this.state.categories.sort();
    var updatedCategories = null;
    if (!this.equal(prevCategories, currentCategories)) {
      updatedCategories = currentCategories;
    }

    if (!(updatedGoals == null && updatedCategories == null)) {
      this.props.updateSettings(updatedGoals, updatedCategories);
    }
    this.props.closeModal();
  };

  // updateGoalsForNewCategory = (newCategories) => {
  //   const goals = this.props.profile.goalsList;
  //   this.props.updateCategories(newCategories);
  //   this.props.changeGoalsAfterCategoryUpdate(goals, newCategories);
  // };

  toggleGoals = (newGoals) => {
    this.setState({numberOfGoals: newGoals});
  };

  toggleCategories = (newCategories) => {
    this.setState({categories: newCategories});
  };

  equal = (list1, list2) => {
    if (list1.length !== list2.length) {
      return false;
    } else {
      for (var i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i]) {
          return false;
        }
      }
    }
    return true;
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    var firstName = this.props.profile.firstName;
    var lastName = this.props.profile.lastName;
    var email = this.props.profile.email;
    var goals = this.state.numberOfGoals;
    var categories = this.props.profile.categories;

    return (
      <View style={styles.screen}>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Settings</Text>
              <TouchableOpacity onPress={() => this.onPressDone()}>
                <Text style={{fontSize: 17}}>Done</Text>
              </TouchableOpacity>
            </View>

            {this.state.loading ? (
              <View>
                <ActivityIndicator size="large" color={PRIMARY_COLOUR} />
              </View>
            ) : (
              <View>
                <View style={styles.settings}>
                  <AccountDetails
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                  />

                  <GoalsSelector goals={goals} updateGoals={this.toggleGoals} />

                  <CategorySelector
                    categories={categories}
                    updateCategories={this.toggleCategories}
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
            )}
          </View>
        </SafeAreaView>
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
    backgroundColor: WHITE,
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
    marginTop: 25,
    marginHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: '#48C9B0',
    alignItems: 'center',
    padding: 12,
    width: '100%',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },
});
