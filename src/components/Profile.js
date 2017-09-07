/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';


export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(){
    super()
    this.state = {
      favorites: [],
    }
  }

  componentWillMount(){
    this.renderList();
  }

  renderList(){
    return fetch(`https://42df16e0.ngrok.io/users/${this.props.navigation.state.params.user_id}/favorites`)
    .then((res) => res.json())
    .then((resJson) => {
      this.setState((prevState) => {
        return {
          favorites: resJson
        }
      })
    })
    .catch((err) => {
      console.log(err);
    })
  };

  deleteThis(){
    console.log('deleteThis was clicked');
    return fetch(`https://42df16e0.ngrok.io/users/${this.props.navigation.state.params.user_id}/favorites/:id`)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TouchableHighlight
            onPress={() => navigate('Search', {user_id: this.props.navigation.state.params.user_id})}
            style={styles.buttonContainer}
            >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.favoritescontainer}>
          <Text style={styles.favoritestitle}>{this.props.navigation.state.params.user_name.toUpperCase()}'s Favorites</Text>
          <FlatList
            data={this.state.favorites}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>
            <View style={styles.results}>
              <View>
                <Image  source={{uri: item.image_url}} style={{height: 70, width: 70, borderRadius: 35, marginRight: 5}}/>
              </View>
              <View>
                <Text>{item.name}</Text>
                <Text>{item.display_address}</Text>
                <Text>Phone: {item.display_phone}</Text>
                <Text>Rating: {item.rating}</Text>
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() => Linking.openURL(item.url)} >
                  <Text style={styles.linkText}>Click Here For more Info</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={this.deleteThis.bind(this)}
                  >
                  <Text style={styles.linkText}>Delete</Text>
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
    backgroundColor: 'rgb(255, 255, 255)'
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
  },
  namecontainer: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    width: 250,
    borderRadius: 5,
    marginBottom: 30
  },
  favoritescontainer: {
    borderWidth: 1,
    borderColor: 'black',
    height: 550,
    width: 350,
    borderRadius: 5
  },
  favoritestitle: {
    textAlign: 'center',
    margin: 10,
  },
  results: {
    margin: 7,
    borderWidth: 1,
    borderColor: '#adadad',
    borderRadius: 5,
    flex: 2,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  linkButton: {
    width: 175,
    height: 25,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
    margin: 3,
  },
  linkText: {
    textAlign: 'center',
    alignItems: 'center',

  }
});
