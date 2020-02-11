import React from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class MovieCategoriesView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=69b647428d7297b0b48fefdcd076b625&language=en-US')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          genres: responseJson.genres,
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

    const genres = this.state.genres

    return (
      <View style={{ flex: 1, backgroundColor: '#1a1919' }}>
        <FlatList
          data={genres}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flex: 1/3 }}
              activeOpacity={0.5}
              onPress={() => {
                console.log("category: ", item);
                this.props.navigation.push("MoviesfromGenre", {
                  genre: item
                });
              }}
            >
              <View style={{
                flexDirection: 'column',
                margin: 4,
                borderColor: '#1a1919',
                borderWidth: 1,
                borderRadius: 12,
                height: 60,
                backgroundColor: '#CDDC39',
              }}>
                <Text style={{ flex: 1, textAlignVertical: "center", textAlign: "center", color: '#00695C', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
