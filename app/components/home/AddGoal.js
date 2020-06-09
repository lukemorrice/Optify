import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOUR, SECONDARY_COLOUR} from '../design';
import {addCustomGoal} from '../../actions/GoalsActions';

class AddGoal extends Component {
  state = {
    title: '',
    description: '',
    category: '',
    customGoalsList: [],
    loading: false,
  };

  componentDidMount() {
    if (this.props.profile.customGoalsList) {
      this.setState({
        customGoalsList: this.props.profile.customGoalsList,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.profile.customGoalsList) {
        this.setState({
          customGoalsList: this.props.profile.customGoalsList,
        });
      }
    }
  }

  onChangeTitle = (title) => {
    this.setState({title});
  };

  onChangeDescription = (description) => {
    this.setState({description});
  };

  submitGoal = () => {
    const title = this.state.title.trim();
    const description = this.state.description.trim();
    if (!(title && description)) {
      Alert.alert('Please complete both fields to add your custom goal');
    } else {
      this.setState({loading: true});
      this.props.addCustomGoal(title, description);
      this.setState({loading: false});
    }
  };

  renderGoals = (goal, index) => {
    return (
      <View>
        <Text style={styles.goalText}>{goal.title}</Text>
      </View>
    );
  };

  renderButtons() {
    if (this.state.loading) {
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
            onPress={() => this.submitGoal()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name={'ios-arrow-round-back'} size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.header}>Add custom goal</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.userGoals}>
              <Text style={styles.subHeading}>Your goals</Text>
              {this.state.customGoalsList !== [] ? (
                <View>
                  <FlatList
                    data={this.state.customGoalsList}
                    renderItem={({item, index}) =>
                      this.renderGoals(item, index)
                    }
                    keyExtractor={(item) => item.title}
                  />
                </View>
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>
                    You haven't added any of your own goals yet, got any in
                    mind?
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.addGoal}>
              <Text style={styles.subHeading}>Add a new goal</Text>
              <View style={styles.element}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Title"
                  onChangeText={this.onChangeTitle.bind(this)}
                  value={this.state.title}
                />
              </View>
              <View style={styles.element}>
                <TextInput
                  style={[styles.textInput, {height: 60}]}
                  placeholder="Description"
                  multiline={true}
                  onChangeText={this.onChangeDescription.bind(this)}
                  value={this.state.description}
                />
              </View>
            </View>
            {this.renderButtons()}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  goals: state.goals,
  customGoals: state.customGoals,
});

const AddGoalComp = connect(mapStateToProps, {addCustomGoal})(AddGoal);
export default withNavigation(AddGoalComp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOUR,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 22, 48, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 60,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '84%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#F9F9F9',
  },
  content: {
    margin: 20,
  },
  subHeading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  userGoals: {
    height: 225,
  },
  goalText: {
    fontSize: 18,
    marginVertical: 3,
  },
  textInput: {
    padding: 10,
    height: 45,
    width: '100%',
    borderWidth: 2,
    borderColor: '#34495E',
    fontSize: 16,
    borderRadius: 8,
    color: 'black',
  },
  element: {
    paddingVertical: 15,
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
    width: 200,
    borderRadius: 15,
  },
  button: {
    paddingTop: 20,
  },
});
