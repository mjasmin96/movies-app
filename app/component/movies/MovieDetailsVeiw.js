import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-shadow-cards';

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
      <View style={{
        flex: 1,
        backgroundColor: '#1a1919'
      }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: 'auto', height: 260 }}
            source={{ uri: 'http://image.tmdb.org/t/p/w185/' + movie.poster_path }}
          />
          <View style={{ position: 'absolute', marginTop: 240, marginHorizontal: 20 }}>
            <Card style={{ padding: 8 }}>
              <Text style={{ color: '#c4b96c', fontSize: 20, fontWeight: 'bold', margin: 5 }}>{movie.title}</Text>
              <Text style={{ margin: 5 }}>{movie.genres.map((genre, index) => {
                if (index == movie.genres.length - 1) {
                  return genre.name;
                }
                return genre.name + ", ";
              })}</Text>
            </Card>
          </View>
        </View>
        <View style={{ flex: 1 / 4, flexDirection: 'row',marginTop: 100, marginHorizontal: 10, justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: '#c4b96c', fontWeight: 'bold', textAlign: 'left' }}>Budget</Text>
            <Text style={{ color: '#8BC34A', textAlign: 'left' }}>{movie.budget}$</Text>
          </View>
          <View>
            <Text style={{ color: '#c4b96c', fontWeight: 'bold', textAlign: 'center' }}>Popularity</Text>
            <Text style={{ color: '#8BC34A', textAlign: 'center' }}>{movie.popularity} Views</Text>
          </View>
          <View>
            <Text style={{ color: '#c4b96c', fontWeight: 'bold', textAlign: 'right' }}>Release Date</Text>
            <Text style={{ color: '#8BC34A', textAlign: 'right' }}>{movie.release_date}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.ovtext}>OVERVIEW</Text>
          <Text style={{ color: '#FFF3E0', marginLeft: 10 }}>{movie.overview}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ovtext: {
    fontWeight: 'bold',
    margin: 10,
    color: '#c4b96c',
    textAlign: 'left'
  }
})