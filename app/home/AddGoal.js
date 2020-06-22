// Disable React Native Picker warning
console.disableYellowBox = true;

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
  Alert,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOUR, WHITE} from '../Style';

class AddGoal extends Component {
  state = {
    title: '',
    description: '',
    dailyGoal: false,
    category: '',
    loading: false,
    editingGoals: false,
  };

  onChangeTitle = (title) => {
    this.setState({title});
  };

  onChangeDescription = (description) => {
    this.setState({description});
  };

  submitGoal = () => {
    const title = this.state.title.trim();
    const description = this.state.description.trim();
    const dailyGoal = this.state.dailyGoal;
    const category = this.state.category;
    var goalTitleExists = false;
    if (this.props.customGoals) {
      const customGoalsTitles = this.props.customGoals.map(
        (goal) => goal.title,
      );
      goalTitleExists = customGoalsTitles.includes(title);
    }
    if (!title || !category) {
      Alert.alert('Please complete a title and category for your goal');
    } else if (goalTitleExists) {
      Alert.alert('Goal titles must be unique');
    } else {
      this.setState({loading: true});
      if (dailyGoal) {
        const completed = false;
        this.props.addDailyGoal(
          title,
          description,
          category,
          dailyGoal,
          completed,
        );
      } else {
        this.props.addCustomGoal(title, description, category, dailyGoal);
      }
      this.setState({loading: false, title: '', description: '', category: ''});
    }
  };

  removeGoal = (goal) => {
    this.props.removeCustomGoal(goal);
  };

  renderGoals = (goal) => {
    if (this.state.editingGoals) {
      if (goal.dailyGoal) {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => this.removeGoal(goal)}
                style={{alignItems: 'center'}}>
                <Icon
                  name="ios-remove-circle"
                  size={34}
                  color="red"
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
              <Text style={styles.goalText}>{goal.title}</Text>
            </View>
            <Text style={{color: 'gray', fontSize: 18}}>(Daily)</Text>
          </View>
        );
      } else {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 40,
            }}>
            <TouchableOpacity
              onPress={() => this.removeGoal(goal)}
              style={{alignItems: 'center'}}>
              <Icon
                name="ios-remove-circle"
                size={34}
                color="red"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            <Text style={styles.goalText}>{goal.title}</Text>
          </View>
        );
      }
    } else {
      if (goal.dailyGoal) {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text style={styles.goalText}>{goal.title}</Text>
            <Text style={{color: 'gray', fontSize: 18}}>(Daily)</Text>
          </View>
        );
      } else {
        return (
          <View
            style={{
              justifyContent: 'center',
              height: 40,
            }}>
            <Text style={styles.goalText}>{goal.title}</Text>
          </View>
        );
      }
    }
  };

  renderButtons() {
    if (this.state.loading) {
      return (
        <View style={{marginTop: 10}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.submitGoal()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      );
    }
  }

  toggleEditGoals = () => {
    this.setState({editingGoals: !this.state.editingGoals});
  };

  toggleDailyGoal = () => {
    this.setState({dailyGoal: !this.state.dailyGoal});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 0, backgroundColor: PRIMARY_COLOUR}} />
        <View style={{flex: 1, backgroundColor: PRIMARY_COLOUR}}>
          <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
            <View style={styles.container}>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <View style={styles.headerContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => this.props.navigation.goBack()}>
                    <Icon
                      name={'ios-arrow-round-back'}
                      size={36}
                      color="white"
                    />
                  </TouchableOpacity>
                  <Text style={styles.header}>Custom Goals</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    accessible={false}>
                    <View style={styles.addGoal}>
                      <Text style={styles.subHeading}>Add a new goal</Text>
                      <View style={{marginTop: 5}}>
                        <View style={styles.element}>
                          <TextInput
                            style={styles.textInput}
                            placeholder="Title"
                            placeholderTextColor="gray"
                            onChangeText={this.onChangeTitle.bind(this)}
                            value={this.state.title}
                          />
                        </View>
                        <View style={styles.element}>
                          <TextInput
                            style={[styles.textInput, {height: 60}]}
                            placeholder="Description"
                            placeholderTextColor="gray"
                            multiline={true}
                            maxLength={90}
                            onChangeText={this.onChangeDescription.bind(this)}
                            value={this.state.description}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 45,
                            marginVertical: 15,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                marginLeft: 2,
                                marginRight: 10,
                                fontWeight: '500',
                              }}>
                              Daily goal
                            </Text>
                            <Switch
                              onValueChange={() => this.toggleDailyGoal()}
                              value={this.state.dailyGoal}
                              trackColor={{true: PRIMARY_COLOUR, false: 'grey'}}
                            />
                          </View>
                          <RNPickerSelect
                            placeholder={{label: 'Category', value: ''}}
                            placeholderTextColor="red"
                            onValueChange={(value) =>
                              this.setState({category: value})
                            }
                            items={[
                              {label: 'Exercise', value: 'exercise'},
                              {label: 'Learning', value: 'learning'},
                              {label: 'Wellbeing', value: 'wellbeing'},
                              {label: 'Habits', value: 'habits'},
                              {label: 'Relationships', value: 'relationships'},
                              {label: 'Creative', value: 'creative'},
                            ]}
                            style={pickerStyle}
                          />
                        </View>
                        {this.renderButtons()}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={styles.userGoals}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      <Text style={styles.subHeading}>Your goals</Text>
                      {this.props.customGoals[0] ? (
                        <TouchableOpacity
                          onPress={() => this.toggleEditGoals()}>
                          <Text style={{fontSize: 17}}>
                            {this.state.editingGoals ? 'Done' : 'Edit'}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View />
                      )}
                    </View>
                    {this.props.customGoals[0] ? (
                      <View style={{flex: 1}}>
                        <FlatList
                          data={this.props.customGoals}
                          renderItem={({item}) => this.renderGoals(item)}
                          keyExtractor={(item) => item.title}
                          scrollEnabled={true}
                          style={{marginBottom: 5}}
                        />
                      </View>
                    ) : (
                      <Text style={{fontSize: 18}}>
                        You haven't added any of your own goals yet, got any in
                        mind?
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

export default withNavigation(AddGoal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOUR,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
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
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: WHITE,
    marginTop: 15,
    flex: 1,
  },
  content: {
    margin: 20,
    flex: 1,
  },
  subHeading: {
    fontSize: 25,
    fontWeight: '600',
  },
  userGoals: {
    marginTop: 40,
    flex: 1,
  },
  addGoal: {
    marginTop: 10,
  },
  goalText: {
    fontSize: 20,
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
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 15,
    marginTop: 10,
  },
});

const pickerStyle = {
  inputIOS: {
    width: 125,
    height: 45,
    borderWidth: 2,
    borderColor: '#34495E',
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
  },
  placeholder: {
    color: 'gray',
  },
};
