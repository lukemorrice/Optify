import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

class AccountSettings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20}}></View>

        <TouchableOpacity>
          <View style={styles.row}>
            <Divider></Divider>
            <View style={styles.genSetting}>
              <Text style={styles.settingName}>Name</Text>
              <Text style={styles.settingValue}>
                {this.props.profile.firstName} {this.props.profile.lastName}
              </Text>
            </View>
            <Divider></Divider>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.row}>
            <Divider></Divider>
            <View style={styles.genSetting}>
              <Text style={styles.settingName}>Email</Text>
              <Text style={styles.settingValue}>
                {this.props.profile.email}
              </Text>
            </View>
            <Divider></Divider>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

const AccountSettingsComp = connect(mapStateToProps)(AccountSettings);
export default withNavigation(AccountSettingsComp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  row: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 12,
  },
  genSetting: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingName: {
    fontSize: 16,
    marginRight: 150,
  },
  settingValue: {
    color: '#808080',
  },
});
