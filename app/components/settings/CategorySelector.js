import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import CategoryItem from './CategoryItem';

export default class CategorySelector extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.setState({categories: this.props.categories});
  }

  updateCategory = (category, toBeAdded) => {
    var categories = this.state.categories;

    if (toBeAdded) {
      categories = categories.concat([category]);
      this.setState({
        categories: categories,
      });
      this.props.updateGoals(categories);
    } else {
      categories = categories.filter((item) => item !== category);
      this.setState({
        categories: categories,
      });
      this.props.updateGoals(categories);
    }
    this.props.updateCategories(categories);
  };

  render() {
    if (this.state.categories[0] == '') {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Types of goals</Text>
        <View style={styles.row}>
          <CategoryItem
            name="Exercise"
            categories={this.props.categories}
            updateCategory={this.updateCategory}
          />
          <CategoryItem
            name="Learning"
            categories={this.props.categories}
            updateCategory={this.updateCategory}
          />
          <CategoryItem
            name="Wellbeing"
            categories={this.props.categories}
            updateCategory={this.updateCategory}
          />
        </View>
        <View style={[styles.row, {borderTopWidth: 0, marginTop: 0}]}>
          <CategoryItem
            name="Creative"
            categories={this.props.categories}
            updateCategory={this.updateCategory}
          />
          <CategoryItem
            name="Relationships"
            categories={this.props.categories}
            updateCategory={this.updateCategory}
          />
          <CategoryItem
            name="Habits"
            categories={this.props.categories}
            updateCategory={this.updateCategory}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
});
