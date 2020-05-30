import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Divider} from 'react-native-elements';

export default class AccountDetails extends Component {
  render() {
    const {firstName, lastName, email} = this.props;
    return (
      <View style={styles.settings}>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 5,
            marginBottom: 50,
          }}>
          <Divider></Divider>
          <View style={styles.accountDetails}>
            <Image
              source={require('../../images/profile.png')}
              style={styles.profileImg}></Image>
            <View style={styles.accountText}>
              <Text style={styles.name}>
                {firstName} {lastName}
              </Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>
          <Divider></Divider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settings: {
    flexDirection: 'column',
    marginTop: 10,
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  profileImg: {
    height: 90,
    width: 90,
    borderRadius: 50,
    borderColor: '#34495E',
    borderWidth: 2,
  },
  name: {
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 5,
  },
  email: {
    color: '#808080',
    fontSize: 15,
  },
  accountText: {
    marginRight: 110,
  },
});
