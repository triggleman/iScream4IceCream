/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import Profile from './Profile';

export default class Search extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(){
    super()
    this.state = {
      locationName: '',
      list: [],
    }
  }

  fetchData(value){
    return fetch(`https://42df16e0.ngrok.io/api?display_address=${value}`)
    .then((res) => res.json())
    .then((resJson) => {
      this.setState((prevState) => {
        return {
          list: resJson.businesses
        }
      })
    })
    .catch((err) => {
      console.log(err);
    })
  };

  async saveFavorites(item){
    console.log('clicked saved button');
    try {
      let response = await fetch('https://42df16e0.ngrok.io/favorites', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            favorite: {
              name: item.name,
              display_address: item.location.address1,
              rating: item.rating,
              display_phone: item.display_phone,
              url: item.url,
              image_url: item.image_url,
              user_id: this.props.navigation.state.params.user_id
          }
        })
      });
      console.log("blahh");
      let res = await response.text();
      console.log(res + " this should show res");
      if(response.status >= 200 && response.status < 300) {
        }else {
          let error = res;
          throw error;
        }
      }  catch(errors) {
    }
    const {navigate} = this.props.navigation;
    navigate('Profile', {user_id: this.props.navigation.state.params.user_id, user_name: this.props.navigation.state.params.user_name});
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput
            style={styles.form}
            placeholder="City, State or Zipcode"
            autoCorrect={false}
            onChangeText={(val) => this.setState({locationName: val})}
            value={this.state.locationName}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.fetchData.bind(this, this.state.locationName)}
            >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <View style={styles.flatlist} >
            <FlatList
              data={this.state.list}
              keyExtractor={(x, i) => i}
              renderItem={({ item }) =>
              <View style={styles.results}>
                <View>
                  <Image  source={{uri: item.image_url}} style={{height: 70, width: 70, borderRadius: 35, marginRight: 5}}/>
                </View>
                <View>

                  <Text>{item.name}</Text>
                  <Text>{item.location.address1}</Text>
                  <Text>{item.location.city}, {item.location.state} {item.location.zip_code}</Text>
                  <Text>Phone: {item.display_phone}</Text>
                  <Text>Rating: {item.rating}</Text>
                  <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => Linking.openURL(item.url)} >
                    <Text style={styles.linkText}>Click Here For more Info</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.linkButton}
                    onPress={this.saveFavorites.bind(this, item)}>
                    <Text style={styles.linkText}>Save !</Text>
                  </TouchableOpacity>
                </View>
              </View>}
            />
          </View>
        </View>
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
    marginTop: 20,
    height: 40,
    width: 300,
    marginBottom: 5,
    borderRadius: 8,
    backgroundColor: '#ebeeec',
    paddingLeft: 10,
    alignItems: 'center',
    marginLeft: 55,
  },
  button: {
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    marginBottom: 20,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    padding: 10,
    color: 'white',
    width: 100,
  },
  results: {
    margin: 7,
    borderWidth: 1,
    borderColor: '#adadad',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  flatlist: {
    width: 350,
    height: 500,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  linkButton: {
    width: 175,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
    margin: 3,
    justifyContent: 'center',
  },
  linkText: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
