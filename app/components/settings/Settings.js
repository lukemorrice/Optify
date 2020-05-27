import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
} from 'react-native';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {withNavigation} from 'react-navigation';
import ModalSelector from 'react-native-modal-selector';
import {connect} from 'react-redux';
import {updateGoals} from '../../actions/ProfileActions';
import {logoutUser} from '../../actions/AuthActions';

class Settings extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
  };

  componentDidMount() {
    this.setState({
      firstName: this.props.profile.firstName,
      lastName: this.props.profile.lastName,
      email: this.props.profile.email,
      goals: this.props.profile.goals,
    });
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
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Settings</Text>
        </View>

        <View style={styles.settings}>
          <TouchableOpacity
            onPress={() => this.props.navigation.push('AccountSettings')}>
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
                    {this.state.firstName} {this.state.lastName}
                  </Text>
                  <Text style={styles.email}>{this.state.email}</Text>
                </View>
                <Icon
                  name={'ios-arrow-forward'}
                  size={24}
                  color="#D2D2D2"></Icon>
              </View>
              <Divider></Divider>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <ModalSelector
              data={[
                {id: 1, name: '1'},
                {id: 2, name: '2'},
                {id: 3, name: '3'},
              ]}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.name}
              onChange={(option) => {
                this.onChangeGoals(option.name);
              }}>
              <View style={styles.row}>
                <Divider></Divider>
                <View style={styles.genSetting}>
                  <Icon name={'ios-star'} size={24} color="green"></Icon>
                  <Text style={styles.settingName}>Daily number of goals</Text>
                  <Text style={styles.settingValue}>{this.state.goals}</Text>
                </View>
                <Divider></Divider>
              </View>
            </ModalSelector>
          </TouchableOpacity>
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

const SettingsComp = connect(mapStateToProps, {updateGoals, logoutUser})(
  Settings,
);
export default withNavigation(SettingsComp);

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
  settings: {
    flexDirection: 'column',
    marginTop: 10,
  },
  row: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 12,
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
    fontSize: 23,
    fontWeight: '500',
    marginBottom: 5,
  },
  email: {
    color: '#808080',
  },
  accountText: {
    marginRight: 120,
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
    fontWeight: '700',
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
