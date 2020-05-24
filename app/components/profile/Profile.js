import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchProfile} from '../../actions/ProfileActions';
import {logoutUser} from '../../actions/AuthActions';

class Profile extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
  };

  componentDidMount() {
    this.props.fetchProfile();
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

  onPressLogout = () => {
    this.props.logoutUser();
  };

  render() {
    if (this.state.firstName === '' || this.state.lastName === '') {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onPressLogout.bind(this)}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {fetchProfile, logoutUser})(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerContainer: {
    marginTop: 75,
    marginLeft: 20,
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    backgroundColor: '#34495E',
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
