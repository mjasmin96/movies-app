import * as React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';


class MoviesView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    console.log(this.props);
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

    return(
    <View style={[styles.scene, { backgroundColor: '#1a1919' }]}>
      <FlatList
        data={movieData}
        renderItem={({ item }) => <Movie movie={item} navigation={this.props.navigation} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
    );
  }
};

const Movie = props => (
  <TouchableOpacity
    onPress={() => {
      console.log("Klik na movie")
      console.log(props.movie)
      props.navigation.push('Details', {
        movie: props.movie,
      });
    }}>
    <View style={styles.item}>
      <Text style={styles.title}>{props.movie.title}</Text>
      <Text style={styles.title}>{props.movie.release_date}</Text>
      <Image
        style={{ width: 'auto', height: 450 }}
        source={{ uri: 'http://image.tmdb.org/t/p/w185/' + props.movie.poster_path }}
      />
    </View>
  </TouchableOpacity>
);

export default withNavigation(MoviesView);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  item: {
    backgroundColor: '#ffffcc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
