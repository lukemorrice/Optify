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
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/AuthActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onChangeEmail = (email) => {
    this.setState({email});
  };

  onChangePassword = (password) => {
    this.setState({password});
  };

  onPressLogin = () => {
    this.props.loginUser(this.state.email, this.state.password);
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
        <TouchableOpacity style={styles.back} onPress={() => Actions.pop()}>
          <Icon name={'ios-arrow-round-back'} size={32} color="#dbf7ff" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>{`Hello again.\nWelcome back.`}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.element}>
            <TextInput
              placeholder="Email"
              textContentType="emailAddress"
              autoCapitalize="none"
              style={styles.input}
              onChangeText={this.onChangeEmail.bind(this)}
              value={this.state.email}></TextInput>
          </View>

          <View style={styles.element}>
            <TextInput
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.input}
              onChangeText={this.onChangePassword.bind(this)}
              value={this.state.password}></TextInput>
          </View>
          {this.renderButtons()}
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{this.props.auth.errorLogging}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {loginUser})(Login);

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
    height: 70,
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
    backgroundColor: '#34495E',
    alignItems: 'center',
    padding: 12,
    width: 350,
    borderRadius: 15,
    marginTop: 15,
  },
  button: {
    paddingTop: 50,
  },
  signup: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
    fontSize: 16,
  },
});
