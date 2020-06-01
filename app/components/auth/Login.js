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
import {loginUser, resetErrors} from '../../actions/AuthActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  onChangeEmail = (email) => {
    this.props.resetErrors();
    this.setState({email, error: ''});
  };

  onChangePassword = (password) => {
    this.props.resetErrors();
    this.setState({password, error: ''});
  };

  onPressLogin = () => {
    if (!(this.state.email && this.state.password)) {
      this.setState({error: 'Please fill out both fields'});
    } else {
      this.props.loginUser(this.state.email, this.state.password);
    }
  };

  renderButtons() {
    if (this.props.auth.loading) {
      return (
        <View style={styles.button}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onPressLogin.bind(this)}>
            <Text style={styles.buttonText}>Login</Text>
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
          <Icon name={'ios-arrow-round-back'} size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>{`Hello again.\nWelcome back.`}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.element}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={this.onChangeEmail.bind(this)}
              value={this.state.email}></TextInput>
          </View>

          <View style={styles.element}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              textContentType="password"
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.input}
              onChangeText={this.onChangePassword.bind(this)}
              value={this.state.password}></TextInput>
          </View>

          <View style={styles.errorContainer}>
            {this.props.auth.errorLogging ? (
              <Text style={styles.error}>{this.props.auth.errorLogging}</Text>
            ) : (
              <Text style={styles.error}>{this.state.error}</Text>
            )}
          </View>
          {this.renderButtons()}

          <View style={[{flexDirection: 'row'}, {justifyContent: 'center'}]}>
            <Text style={styles.signup}>New to Optify? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={[styles.signup, {color: '#ff4d4d'}]}>
                Sign up here
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

const LoginComp = connect(mapStateToProps, {loginUser, resetErrors})(Login);
export default withNavigation(LoginComp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    borderColor: '#34495E',
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
  signup: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
    fontSize: 16,
  },
});
