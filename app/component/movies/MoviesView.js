import * as React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import Movie from '../movies/MoviefromGenre';


class MoviesView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    const genre = this.props.navigation.getParam('genre');
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=69b647428d7297b0b48fefdcd076b625&language=en-US&with_genres=' + genre.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          movielist: responseJson.results,
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

    const movieData = this.state.movielist;

    return (
      <View style={{ backgroundColor: '#1a1919', flex: 1 }}>
        <FlatList
          data={movieData}
          renderItem={({ item }) => <Movie movie={item} navigation={this.props.navigation}
          detailsScreen={"Details"}  />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      </View>
    );
  }
};

export default withNavigation(MoviesView);