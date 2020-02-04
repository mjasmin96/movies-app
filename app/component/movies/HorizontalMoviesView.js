import React from 'react';
import { Text, Image, FlatList, View, TouchableOpacity } from 'react-native';

export default class HorizontalMoviesView extends React.Component {
  render() {
    const movies = this.props.movies;
    return (
      <View style={{ backgroundColor: '#1a1919', }}>
        <FlatList
          data={movies}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.push(this.props.detailScreen, {
                  movie: item,
                });
              }}>
              <View
                style={{ width: 120, backgroundColor: '#00000000', margin: 10 }}>
                <Image
                  style={{ width: 'auto', height: 160 }}
                  source={{ uri: 'http://image.tmdb.org/t/p/w185/' + item.poster_path }}
                />
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    margin: 10,
                    color: 'white'
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
