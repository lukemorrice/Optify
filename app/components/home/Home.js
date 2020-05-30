import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {FlatList} from 'react-native-gesture-handler';
import {fetchProfile} from '../../actions/ProfileActions';
import {fetchGoals} from '../../actions/GoalsActions';
import Goal from './components/GoalItem';
import Greeting from './components/Greeting';
import Date from './components/Date';
import Header from './components/Header';
import ModalScreen from './Modal';

class Home extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    goals: '',
    goalsList: [],
    showDescription: [false, false, false],
    isModalVisible: false,
  };

  componentDidMount() {
    this.props.fetchProfile();
    this.props.fetchGoals();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.profile) {
        this.setState({
          firstName: this.props.profile.firstName,
          lastName: this.props.profile.lastName,
          email: this.props.profile.email,
          goals: this.props.profile.goals,
        });
      }
      if (this.props.goals.goals) {
        this.setState({
          goalsList: this.sortByCompleted(this.props.goals.goals),
        });
      }
    }
  }

  sortByCompleted = (list) => {
    return list.sort((x, y) => x.completed - y.completed);
  };

  toggleDescription = (index) => {
    this.state.showDescription[index] = !this.state.showDescription[index];
    this.setState({showDescription: this.state.showDescription});
  };

  renderGoals = (goal, index) => {
    return (
      <Goal
        goals={this.state.goalsList.slice(0, parseInt(this.state.goals))}
        goal={goal}
        index={index}
        updateGoals={this.updateGoals}
        toggleDescription={this.toggleDescription}
        showDescription={this.state.showDescription}
      />
    );
  };

  toggleGoalCompletion = (index) => {
    showDescription[index] = !showDescription[index];
    this.setState({showDescription});
  };

  updateGoals = (newGoalsList) => {
    this.setState({goalsList: this.sortByCompleted(newGoalsList)});
  };

  toggleVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    if (!this.state.firstName || !this.state.goalsList[0]) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <View style={styles.headerContainer}>
            <Header
              navigation={this.props.navigation}
              toggleVisible={this.toggleVisible}
            />
          </View>
        </View>

        <View style={styles.content}>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <View style={styles.dateContainer}>
              <Date />
            </View>

            <View style={styles.greetingContainer}>
              <Greeting name={this.state.firstName} goals={this.state.goals} />
            </View>
          </View>

          <View style={styles.goalHeading}>
            <View style={styles.goalDivider} />
            <Text style={styles.goalHeadingText}>
              Today's {this.state.goals > 1 ? 'goals' : 'goal'}
            </Text>
            <View style={styles.goalDivider} />
          </View>

          <View style={{marginLeft: 20, marginRight: 20}}>
            <View style={styles.goalsContainer}>
              <FlatList
                data={this.state.goalsList.slice(0, parseInt(this.state.goals))}
                renderItem={({item, index}) => this.renderGoals(item, index)}
                keyExtractor={(item) => item.title}
              />
            </View>
          </View>

          <ModalScreen
            isVisible={this.state.isModalVisible}
            toggleVisible={this.toggleVisible}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  goals: state.goals,
});

const HomeComp = connect(mapStateToProps, {fetchProfile, fetchGoals})(Home);
export default withNavigation(HomeComp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48C9B0',
  },
  headerContainer: {
    marginTop: 70,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '84%',
    borderRadius: 40,
    backgroundColor: '#F9F9F9',
    paddingBottom: 300,
  },
  dateContainer: {
    marginTop: 50,
  },
  greetingContainer: {
    marginTop: 50,
  },
  goalsContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  goalHeading: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  goalHeadingText: {
    fontSize: 26,
    fontWeight: '600',
    paddingHorizontal: 25,
  },
  goalDivider: {
    backgroundColor: 'black',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
});
