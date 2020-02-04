import React from 'react';
import { Text, View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
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
        <Text style={styles.text}>LATEST MOVIES</Text>
        <HorizontalMoviesView
          style={{ height: 100 }}
          movies={this.state.latestmovies}
          navigation={this.props.navigation}
          detailScreen={"HomeDetails"}
        />
        <Text style={styles.text}>POPULAR MOVIES</Text>
        <HorizontalMoviesView
          style={{ height: 100 }}
          movies={this.state.popularmovies}
          navigation={this.props.navigation}
          detailScreen={"HomeDetails"}
        />
        <Text style={styles.text}>TOP RATED MOVIES</Text>
        <HorizontalMoviesView
          style={{ height: 100 }}
          movies={this.state.topmovies}
          navigation={this.props.navigation}
          detailScreen={"HomeDetails"}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#c4b96c',
    backgroundColor: '#1a1919',
    paddingTop: 36,
    paddingBottom: 6,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 3,
  }
})
