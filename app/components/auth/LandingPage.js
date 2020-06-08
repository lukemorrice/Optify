import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  StatusBar,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import OptifyHeader from './OptifyHeader';

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
        <StatusBar barStyle="dark-content" />
        <View style={{marginTop: 125}}>
          <OptifyHeader />
        </View>

        <SwiperFlatList
          style={{width: 350}}
          showPagination
          paginationStyle={{marginBottom: 330}}
          paginationStyleItem={{width: 8, height: 8}}
          paginationActiveColor="#48C9B0"
          paginationDefaultColor="#808080">
          <View style={styles.page}>
            <Text style={styles.text}>
              Optify sends you goals every day to help you develop and grow
            </Text>
          </View>
          <View style={styles.page}>
            <Text style={styles.text}>
              Work on improving yourself by 1% every day and you will be{' '}
              <Text style={{fontWeight: '800'}}>37 times</Text> better after a
              year
            </Text>
          </View>
          <View style={styles.page}>
            <Text style={styles.text}>
              Optify provides small, daily habits which compound to help you
              become the best version of yourself
            </Text>
          </View>
        </SwiperFlatList>

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
  page: {
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 5,
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
    fontWeight: '500',
  },
});
