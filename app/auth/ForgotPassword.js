import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {handlePasswordReset, resetErrors} from '../actions/authorisation';
import {PRIMARY_COLOUR} from '../Style';

class ForgotPassword extends Component {
  state = {
    email: '',
    error: '',
    success: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      var success = false;
      if (
        this.props.error.errorReset == 'Password reset email sent successfully'
      ) {
        console.log(
          this.props.error.errorReset ==
            'Password reset email sent successfully',
        );
        success = true;
      }
      this.setState({
        error: this.props.error.errorReset,
        success,
      });
    }
  }

  onChangeEmail = (email) => {
    this.setState({email});
    this.props.resetErrors();
  };

  onPressSend = () => {
    const email = this.state.email;
    if (email == '') {
      Alert.alert('Please enter your email address to reset your password');
    } else {
      this.props.handlePasswordReset(email);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name={'ios-arrow-round-back'} size={36} color="white" />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.header}>Forgot your password?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="gray"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={this.onChangeEmail.bind(this)}
            value={this.state.email}></TextInput>
          {this.state.error !== '' ? (
            <View style={styles.errorContainer}>
              <Text
                style={{
                  fontSize: 17,
                  color: this.state.success ? PRIMARY_COLOUR : 'red',
                }}>
                {this.state.error}
              </Text>
            </View>
          ) : (
            <View />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onPressSend()}>
              <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth,
});

const mapDispatchToProps = {handlePasswordReset, resetErrors};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '500',
  },
  input: {
    padding: 10,
    height: 45,
    width: '75%',
    borderWidth: 2,
    borderColor: 'black',
    fontSize: 16,
    borderRadius: 8,
    color: 'black',
    marginTop: 30,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
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
  button: {
    backgroundColor: '#48C9B0',
    alignItems: 'center',
    padding: 12,
    width: '75%',
    borderRadius: 15,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },
  errorContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
