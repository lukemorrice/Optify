import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class LandingPage extends Component {
  onPressSignUp = () => {
    this.props.navigation.navigate('Signup');
  };

  onPressLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Optify</Text>
        </View>

        <View
          style={[
            styles.textContainer,
            {marginBottom: 40, marginHorizontal: 15},
          ]}>
          <Text style={styles.text}>
            Optify sends you goals every day to help you develop and grow.
          </Text>
          <Text style={styles.text}>
            <Icon name="dot-single" size={35} />
          </Text>
          <Text style={styles.text}>
            Work on improving yourself by 1% every day and you will be 37 times
            better after a year.
          </Text>
          <Text style={styles.text}>
            <Icon name="dot-single" size={35} />
          </Text>
          <Text style={styles.text}>
            Optify focuses on small, daily habits which compound together to
            help you become the best version of yourself.
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
    backgroundColor: 'white',
  },
  header: {
    fontSize: 44,
    textAlign: 'center',
    marginTop: 100,
    fontWeight: 'bold',
    color: '#48C9B0',
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
    fontSize: 18,
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
  login: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
    fontSize: 16,
  },
});
