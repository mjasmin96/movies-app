import React from 'react';
import { Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import HorizontalMoviesView from '../movies/HorizontalMoviesView';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }


  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=69b647428d7297b0b48fefdcd076b625&language=en-US&page=1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          latestmovies: responseJson.results,
        }, function () { })
      })
      .catch((error) => {
        console.error(error);
      });

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=69b647428d7297b0b48fefdcd076b625&language=en-US&page=1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          popularmovies: responseJson.results
        }, function () { })
      })
      .catch((error) => {
        console.error(error);
      });

    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=69b647428d7297b0b48fefdcd076b625&language=en-US&page=1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          topmovies: responseJson.results
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

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={{ textAlign: 'center' }}>LATEST MOVIES</Text>
        <HorizontalMoviesView
          style={{ height: 100 }}
          movies={this.state.latestmovies}
          navigation={this.props.navigation}
          detailScreen={"HomeDetails"}
        />
        <Text style={{ textAlign: 'center' }}>POPULAR MOVIES</Text>
        <HorizontalMoviesView
          style={{ height: 100 }}
          movies={this.state.popularmovies}
          navigation={this.props.navigation}
          detailScreen={"HomeDetails"}
        />
        <Text style={{ textAlign: 'center' }}>TOP RATED MOVIES</Text>
        <HorizontalMoviesView
          style={{ height: 100 }}
          movies={this.state.topmovies}
          navigation={this.props.navigation}
          detailScreen={"HomeDetails"}
        />
        <Button
          title="Go to Movies"
          onPress={() => this.props.navigation.navigate('Movies')}
        />
      </ScrollView>
    );
  }
}
