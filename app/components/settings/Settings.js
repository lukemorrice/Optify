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
import {updateGoals} from '../../actions/ProfileActions';
import {logoutUser} from '../../actions/AuthActions';
import AccountDetails from './AccountDetails';
import GoalsSelector from './GoalsSelector';

class Settings extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    this.setState({
      firstName: this.props.profile.firstName,
      lastName: this.props.profile.lastName,
      email: this.props.profile.email,
      goals: this.props.profile.goals,
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
      });
    }
  }

  onChangeGoals = (goal) => {
    this.props.updateGoals(goal);
  };

  onPressLogout = () => {
    this.props.logoutUser();
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

const SettingsComp = connect(mapStateToProps, {updateGoals, logoutUser})(
  Settings,
);
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
    fontSize: 16,
    marginTop: 12,
  },
  settings: {
    flexDirection: 'column',
    marginTop: 10,
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: 190,
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
