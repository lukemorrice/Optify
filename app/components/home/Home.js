import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import Utils from './Utils';
import {connect} from 'react-redux';
import {fetchProfile} from '../../actions/ProfileActions';

class Home extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
    day: '',
    date: '',
    greeting: '',
  };

  componentDidMount() {
    this.props.fetchProfile();
    var utils = new Utils();
    var greeting = utils.getGreeting();
    var day = utils.getDay();
    var date = utils.getDate();
    this.setState({day, date, greeting});
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

  render() {
    LayoutAnimation.easeInEaseOut();

    if (this.state.firstName === '' || this.state.lastName === '') {
      return <ActivityIndicator />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Home</Text>
          <View style={styles.date}>
            <Text style={styles.day}>{this.state.day}</Text>
            <Text style={styles.dateText}>{this.state.date}</Text>
          </View>
        </View>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>
            {this.state.greeting} {this.state.firstName}!
          </Text>
          <Text style={styles.greetingText}>Here are your goals for today</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {fetchProfile})(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerContainer: {
    marginTop: 75,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  day: {
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 3,
    color: '#000000',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  greeting: {
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 15,
  },
  greetingText: {
    fontSize: 21,
    fontWeight: '500',
  },
});
