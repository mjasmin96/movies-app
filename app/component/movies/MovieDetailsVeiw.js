import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
import Trailer from '../movies/Trailer';
var SharedPreferences = require('react-native-shared-preferences');


export default class MovieDetailsVeiw extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isFavorite: false
    }
  }

  componentDidMount() {

    const movie = this.props.navigation.getParam('movie');

    fetch('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=69b647428d7297b0b48fefdcd076b625&language=en-US')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          moviedetails: responseJson,
        }, function () { })
      })
      .catch((error) => {
        console.error(error);
      });

    SharedPreferences.getItem("favorites", (value) => {
      if (value == undefined) {
        value = "[]";
      }
      var favoritesList = JSON.parse(value);
      var found = favoritesList.find((m) => m.id == movie.id);

      this.setState(
        { isFavorite: found != undefined }
      )
    });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    console.log(this.state);
    const movie = this.state.moviedetails;

    function budgetconverter() {
      if (movie.budget > 999 && movie.budget < 999999) {
        return (movie.budget / 1000) + 'k';
      }
      else if (movie.budget > 999999) {
        return (movie.budget / 1000000) + 'm';
      }
      return movie.budget;
    };

    function timeconverter(n) {
      var num = n;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + "h" + rminutes + "min";
    }

    return (
      <ScrollView style={{
        flex: 1,
        backgroundColor: '#1a1919'
      }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ aspectRatio: 16 / 11 }}
            source={{ uri: 'http://image.tmdb.org/t/p/w185/' + movie.backdrop_path }}
          />
          <Trailer
            navigation={this.props.navigation}
          />
          <View style={{ position: 'absolute', marginTop: 240, marginHorizontal: 20 }}>
            <Card style={{ padding: 8 }}>
              <Text style={{ color: '#c4b96c', fontSize: 20, fontWeight: 'bold', margin: 5 }}>{movie.title}</Text>
              <TouchableOpacity
                onPress={() => {
                  const newFavorite = !this.state.isFavorite;

                  SharedPreferences.getItem("favorites", (value) => {
                    if (value == undefined) {
                      value = "[]";
                    }
                    var favoritesList = JSON.parse(value);
                    const movie = this.props.navigation.getParam('movie');
                    if (newFavorite) {
                      favoritesList.push(movie);
                    } else {
                      favoritesList = favoritesList.filter((m) => m.id != movie.id);
                    }
                    SharedPreferences.setItem("favorites", JSON.stringify(favoritesList));
                  });

                  this.setState(
                    { isFavorite: newFavorite }
                  )
                }} style={{ position: 'absolute', marginVertical: 24, right: 10 }}>
                <Ionicons name={this.state.isFavorite ? "md-heart" : "md-heart-empty"} size={34} />
              </TouchableOpacity>
              <Text style={{ margin: 5 }}>{movie.genres.map((genre, index) => {
                if (index == movie.genres.length - 1) {
                  return genre.name;
                }
                return genre.name + ", ";
              })}</Text>
            </Card>
          </View>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 70,
          paddingHorizontal: 16,
          marginHorizontal: 10,
          justifyContent: 'space-between'
        }}>
          <View>
            <Text style={{ color: '#c4b96c', fontWeight: 'bold', textAlign: 'left' }}>Budget</Text>
            <Text style={{ color: '#8BC34A', textAlign: 'left' }}>{budgetconverter(movie.budget)}$</Text>
          </View>
          <View>
            <Text style={{ color: '#c4b96c', fontWeight: 'bold', textAlign: 'center' }}>Rating</Text>
            <Text style={{ color: '#8BC34A', textAlign: 'center' }}>{movie.vote_average} *</Text>
          </View>
          <View>
            <Text style={{ color: '#c4b96c', fontWeight: 'bold', textAlign: 'right' }}>Release Date</Text>
            <Text style={{ color: '#8BC34A', textAlign: 'right' }}>{Moment(movie.release_date).format('DD MMM YYYY')}</Text>
          </View>
        </View>
        <View style={{
          flex: 1,
          paddingHorizontal: 16,
          marginVertical: 20
        }}>
          <Text style={{
            color: '#c4b96c',
            fontWeight: 'bold',
            marginHorizontal: 10
          }}>RUNTIME: {timeconverter(movie.runtime)}</Text>
          <Text style={{
            color: '#E8EAF6',
            fontWeight: 'bold',
            marginHorizontal: 10,
            marginTop: 14,
            fontSize: 16
          }}>Main quote: {movie.tagline}</Text>
          <Text style={styles.ovtext}>OVERVIEW</Text>
          <Text style={{ color: '#FFF3E0', marginHorizontal: 10 }}>{movie.overview}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ovtext: {
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
    color: '#c4b96c',
    textAlign: 'left'
  }
});