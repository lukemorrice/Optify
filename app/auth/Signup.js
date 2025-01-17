import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {createUser, resetErrors} from '../actions/authorisation';
import {Platform} from 'react-native';

class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    inputs: {},
  };

  focusOnField = (id) => {
    if (id == 'password2' && this.state.password == '') {
      Keyboard.dismiss();
    } else {
      this.state.inputs[id].focus();
    }
  };

  onChangeFirstName = (firstName) => {
    firstName = firstName.trim();
    this.props.resetErrors();
    this.setState({
      firstName,
      error: '',
    });
  };

  onChangeLastName = (lastName) => {
    lastName = lastName.trim();
    this.props.resetErrors();
    this.setState({
      lastName,
      error: '',
    });
  };

  onChangeEmail = (email) => {
    email = email.trim();
    this.props.resetErrors();
    this.setState({
      email,
      error: '',
    });
  };

  onChangePassword = (password) => {
    this.props.resetErrors();
    this.setState({
      password,
      error: '',
    });
  };

  onChangeConfirmPassword = (confirmPassword) => {
    this.props.resetErrors();
    this.setState({
      confirmPassword,
      error: '',
    });
  };

  onPressSignUp = () => {
    if (
      !(
        this.state.firstName &&
        this.state.lastName &&
        this.state.email &&
        this.state.password
      )
    ) {
      this.setState({error: 'Please fill out all fields'});
    } else if (this.state.password.length < 6) {
      this.setState({
        error: 'Password must be at least 6 characters',
      });
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({error: "Passwords don't match"});
    } else {
      this.props.createUser(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password,
      );
    }
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
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => this.props.navigation.goBack()}>
              <Icon name={'ios-arrow-round-back'} size={36} color="white" />
            </TouchableOpacity>

            <View
              style={{
                marginHorizontal: 20,
                marginTop: 35,
              }}>
              <View style={styles.headerContainer}>
                <Text
                  style={
                    styles.header
                  }>{`Hello!\nSign up to get started.`}</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.element}>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="gray"
                    autoCorrect={false}
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => this.focusOnField('lastName')}
                    onChangeText={this.onChangeFirstName.bind(this)}
                    value={this.state.firstName}></TextInput>
                </View>

                <View style={styles.element}>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="gray"
                    autoCorrect={false}
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => this.focusOnField('email')}
                    ref={(input) => {
                      this.state.inputs['lastName'] = input;
                    }}
                    onChangeText={this.onChangeLastName.bind(this)}
                    value={this.state.lastName}></TextInput>
                </View>

                <View style={styles.element}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => this.focusOnField('password')}
                    ref={(input) => {
                      this.state.inputs['email'] = input;
                    }}
                    onChangeText={this.onChangeEmail.bind(this)}
                    value={this.state.email}></TextInput>
                </View>

                <View style={styles.element}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => this.focusOnField('password2')}
                    ref={(input) => {
                      this.state.inputs['password'] = input;
                    }}
                    onChangeText={this.onChangePassword.bind(this)}
                    value={this.state.password}></TextInput>
                </View>

                {this.state.password !== '' ? (
                  <View style={styles.element}>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="gray"
                      secureTextEntry
                      autoCapitalize="none"
                      ref={(input) => {
                        this.state.inputs['password2'] = input;
                      }}
                      onChangeText={this.onChangeConfirmPassword.bind(this)}
                      value={this.state.confirmPassword}></TextInput>
                  </View>
                ) : (
                  <View />
                )}

                <View style={styles.errorContainer}>
                  {this.props.auth.errorCreating ? (
                    <Text style={styles.error}>
                      {this.props.auth.errorCreating}
                    </Text>
                  ) : (
                    <Text style={styles.error}>{this.state.error}</Text>
                  )}
                </View>
                {this.renderButtons()}

                <View
                  style={[{flexDirection: 'row'}, {justifyContent: 'center'}]}>
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const SignupComp = connect(mapStateToProps, {createUser, resetErrors})(Signup);
export default withNavigation(SignupComp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(21, 22, 48, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    padding: 10,
    height: 45,
    width: '100%',
    borderWidth: 2,
    borderColor: 'black',
    fontSize: 16,
    borderRadius: 8,
    color: 'black',
  },
  element: {
    padding: 15,
    width: '100%',
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
    width: '100%',
    borderRadius: 15,
  },
  button: {
    paddingTop: 25,
    width: '100%',
  },
  login: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
  },
});
