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
import {addCustomGoal, removeCustomGoal} from '../../actions/GoalsActions';
import * as firebase from 'firebase';

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
      } else {
        this.setState({
          customGoalsList: [],
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
      this.setState({loading: false, title: '', description: ''});
    }
  };

  removeGoal = (goal) => {
    const goalTitle = goal.title;
    const {currentUser} = firebase.auth();
    const dbRef = firebase.database().ref(`/users/${currentUser.uid}/profile`);

    dbRef.once('value', (snap) => {
      var customGoalsList = snap.val().customGoalsList;
      customGoalsList = customGoalsList.filter(
        (goal) => goal.title !== goalTitle,
      );

      dbRef.update({
        customGoalsList,
      });
    });
  };

  renderGoals = (goal, index) => {
    if (this.state.editingGoals) {
      return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.removeGoal(goal)}>
            <Icon name="ios-remove-circle" size={32} color="red" />
          </TouchableOpacity>
          <Text style={[styles.goalText, {marginLeft: 15}]}>{goal.title}</Text>
        </View>
      );
    } else {
      return <Text style={styles.goalText}>{goal.title}</Text>;
    }
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

  toggleEditGoals = () => {
    this.setState({editingGoals: !this.state.editingGoals});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name={'ios-arrow-round-back'} size={36} color="white" />
          </TouchableOpacity>
          <Text style={styles.header}>Custom Goals</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
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
                  maxLength={85}
                  onChangeText={this.onChangeDescription.bind(this)}
                  value={this.state.description}
                />
              </View>
            </View>

            {this.renderButtons()}

            {this.state.customGoalsList[0] ? (
              <View style={styles.userGoals}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.subHeading}>Your goals</Text>
                  <TouchableOpacity onPress={() => this.toggleEditGoals()}>
                    <Text style={{fontSize: 17}}>
                      {this.state.editingGoals ? 'Done' : 'Edit'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <FlatList
                    data={this.state.customGoalsList}
                    renderItem={({item, index}) =>
                      this.renderGoals(item, index)
                    }
                    keyExtractor={(item) => item.title}
                    scrollEnabled={false}
                    style={{height: 300}}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.userGoals}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.subHeading}>Your goals</Text>
                </View>
                <Text style={{fontSize: 18}}>
                  You haven't added any of your own goals yet, got any in mind?
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  goals: state.goals,
});

const AddGoalComp = connect(mapStateToProps, {addCustomGoal, removeCustomGoal})(
  AddGoal,
);
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
    width: 38,
    height: 38,
    borderRadius: 19,
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
    fontSize: 25,
    fontWeight: '600',
  },
  userGoals: {
    marginTop: 75,
  },
  addGoal: {
    marginTop: 10,
  },
  goalText: {
    fontSize: 20,
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
    paddingTop: 15,
  },
});
