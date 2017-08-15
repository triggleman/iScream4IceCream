/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class SignUp extends Component {

  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: []
    }
  }

async registerUser(){
  console.log('this was clicked');
  try {
    let response = await fetch('https://849e8859.ngrok.io/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }
      })
    });
    console.log('almosted there');
    let res = await response.text();
    console.log(res);
    if(response.status >= 200 && response.status < 300) {
      const {navigate} = this.props.navigation;
      navigate('Profile', {user_id: JSON.parse(res).id});
    }else {
      let error = res;
      throw error;
    }
  }  catch(errors) {
  }
}


  render() {
    //const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <TextInput
            style={styles.form}
            onChangeText={(val) => this.setState({name: val})}
            placeholder="Name"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.form}
            onChangeText={(val) => this.setState({email: val})}
            placeholder="Email"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.passwordInput.focus()}
          />
          <TextInput
            style={styles.form}
            onChangeText={(val) => this.setState({password: val})}
            placeholder="Password"
            secureTextEntry={true}
            returnKeyType="next"
            ref={(input) => this.passwordInput = input}
          />
          <TextInput
            style={styles.form}
            onChangeText={(val) => this.setState({password_confirmation: val})}
            placeholder="Password Confirmation"
            secureTextEntry={true}
            ref={(input) => this.passwordInput = input}
          />
          <TouchableHighlight
            onPress={this.registerUser.bind(this)}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText} >Sign Up</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(255, 255, 255)'
  },
  form: {
    height: 40,
    width: 300,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#ebeeec'
  },
  buttonContainer: {
    margin: 10,
    borderColor: '#adadad',
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 8
  }
});
