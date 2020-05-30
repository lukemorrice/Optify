import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {createUser} from '../../actions/AuthActions';

class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  onChangeFirstName = (firstName) => {
    this.setState({
      firstName,
    });
  };

  onChangeLastName = (lastName) => {
    this.setState({
      lastName,
    });
  };

  onChangeEmail = (email) => {
    this.setState({
      email,
    });
  };

  onChangePassword = (password) => {
    this.setState({
      password,
    });
  };

  onPressSignUp = () => {
    this.props.createUser(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password,
    );
  };

  renderButtons() {
    if (this.props.auth.loading) {
      return <ActivityIndicator />;
    } else {
      return (
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onPressSignUp.bind(this)}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name={'ios-arrow-round-back'} size={32} color="#dbf7ff" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>{`Hello!\nSign up to get started.`}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.element}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              autoCorrect={false}
              onChangeText={this.onChangeFirstName.bind(this)}
              value={this.state.firstName}></TextInput>
          </View>

          <View style={styles.element}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              autoCorrect={false}
              onChangeText={this.onChangeLastName.bind(this)}
              value={this.state.lastName}></TextInput>
          </View>

          <View style={styles.element}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={this.onChangeEmail.bind(this)}
              value={this.state.email}></TextInput>
          </View>

          <View style={styles.element}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={this.onChangePassword.bind(this)}
              value={this.state.password}></TextInput>
          </View>

          <View style={styles.errorContainer}>
            <Text style={styles.error}>{this.props.auth.errorCreating}</Text>
          </View>
          {this.renderButtons()}

          <View style={[{flexDirection: 'row'}, {justifyContent: 'center'}]}>
            <Text style={styles.login}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const SignupComp = connect(mapStateToProps, {createUser})(Signup);
export default withNavigation(SignupComp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbf7ff',
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 22, 48, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 200,
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    padding: 10,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 25,
  },
  error: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
  input: {
    padding: 10,
    height: 45,
    width: 350,
    borderWidth: 2,
    borderColor: 'black',
    fontSize: 16,
    borderRadius: 8,
  },
  element: {
    padding: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },
  buttonContainer: {
    backgroundColor: '#48C9B0',
    alignItems: 'center',
    padding: 12,
    width: 350,
    borderRadius: 15,
  },
  button: {
    paddingTop: 40,
  },
  login: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
    fontSize: 16,
  },
});
