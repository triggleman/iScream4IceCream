/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LogIn from './src/components/LogIn';
import SignUp from './src/components/SignUp';
import Profile from './src/components/Profile';
import Search from './src/components/Search';


console.disableYellowBox = true;
export default class Home extends Component {

  render() {
    return (
      <LogIn />
    )
  }
}

const final_project = StackNavigator({
  Login: { screen: LogIn },
  Signup: {screen: SignUp},
  Profile: {screen: Profile},
  Search: {screen: Search }
});

AppRegistry.registerComponent('final_project', () => final_project);
