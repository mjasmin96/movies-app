import React from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';

export default class MovieDetailsVeiw extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
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
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    const movie = this.state.moviedetails;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 36 }}>
        <Text style={{ fontWeight: 'bold', margin: 10 }}>OVERVIEW</Text>
        <Text>{movie.overview}</Text>
        <Text style={{ fontWeight: 'bold', margin: 10 }}>GENRES</Text>
        <Text>{movie.genres.map((genre, index) => {
          if (index == movie.genres.length - 1) {
            return genre.name;
          }
          return genre.name + ", ";
          })}</Text>
      </View>
    );
  }
}