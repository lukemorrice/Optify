import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions,
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
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%',
          }}>
          <View
            style={{
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <OptifyHeader />

            <View style={{height: '40%'}}>
              <SwiperFlatList
                autoplay
                autoplayDelay={3}
                autoplayLoop
                showPagination
                paginationStyle={{height: '10%'}}
                paginationStyleItem={{width: 8, height: 8}}
                paginationActiveColor="#48C9B0"
                paginationDefaultColor="#808080">
                <View style={styles.page}>
                  <Text style={styles.text}>
                    Optify helps you build habits to become the best version of
                    yourself
                  </Text>
                </View>
                <View style={styles.page}>
                  <Text style={styles.text}>
                    Goals are sent every day for you to complete
                  </Text>
                </View>
                <View style={styles.page}>
                  <Text style={styles.text}>
                    These beneficial challenges help you to develop and grow
                  </Text>
                </View>
                <View style={styles.page}>
                  <Text style={styles.text}>
                    Improve just 1% a day, and after a year, you will be{' '}
                    <Text style={{fontWeight: '800'}}>37</Text> times better
                  </Text>
                </View>
              </SwiperFlatList>
            </View>
          </View>

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

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  page: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 19,
    fontWeight: '500',
    width: '90%',
    backgroundColor: 'white',
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
