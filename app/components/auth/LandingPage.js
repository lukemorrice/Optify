import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class LandingPage extends Component {
  onPressSignUp = () => {
    Actions.signup();
  };

  onPressLogin = () => {
    Actions.login();
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Optify</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Description of what the app is and why its beneficial, especially
            during this quarantine period.
          </Text>
        </View>

        <View style={styles.textContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onPressSignUp.bind(this)}>
            <Text style={styles.buttonText}>Create an account</Text>
          </TouchableOpacity>

          <View style={[{flexDirection: 'row'}, {justifyContent: 'center'}]}>
            <Text style={styles.login}>Already have an account? </Text>
            <TouchableOpacity onPress={this.onPressLogin.bind(this)}>
              <Text style={[styles.login, {color: '#ff4d4d'}]}>
                Log in here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#dbf7ff',
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 100,
    fontWeight: 'bold',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 20,
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
  login: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
    fontSize: 16,
  },
});
