import React, { Component } from 'react';
import {StyleSheet,
        View,
        Image,
        KeyboardAvoidingView,
        TouchableHighlight,
        TextInput,
        Text
    } from 'react-native';

export default class LogIn extends Component {

  constructor(){
    super();
    this.state = {
      inputs: {
        email: '',
        password: '',
      }
    }
  }

  async loginUser(){
    try{
      let response = await fetch('https://849e8859.ngrok.io/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: {
            email: this.state.email,
            password: this.state.password,
          }
        })
      });
      let res = await response.text();
      console.log(res);
      if (response.status >= 200 && response.status < 300) {
        const {navigate} = this.props.navigation;
        navigate('Profile', {user_id: JSON.parse(res).id})
      }
      else {
        let error = res;
        throw error;
      }
    } catch(error) {
      console.log(error);
    }
  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          source={require('../.././images/icecreamcone.png')}
          style={{width: 150, height: 150}}
        />
        <Image
          source={require('../.././images/motto.png')}
          style={{width: 250, height: 150}}
        />
        <View >
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
            returnKeyType="go"
            ref={(input) => this.passwordInput = input}
          />
          <TouchableHighlight
            onPress={this.loginUser.bind(this)}
            style={styles.buttonContainer} >
            <Text style={styles.buttonText} >Log In</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigate('Signup')}
            style={styles.buttonContainer}
            >
            <Text style={styles.buttonText}>Sign Up</Text>
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
    justifyContent: 'flex-end',
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
    width: 300,
    marginBottom: 20
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 8
  }
})
