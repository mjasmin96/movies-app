import React from 'react';
import {Text, Image, FlatList, View, TouchableOpacity} from 'react-native';

export default class HorizontalMoviesView extends React.Component {
  render() {
    const movies = this.props.movies;
    return (
      <View style={{backgroundColor: '#1a1919', height: 240}}>
        <FlatList
          data={movies}
          horizontal={true}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.push(this.props.detailScreen, {
                  movie: item,
                });
              }}>
              <View
                style={{width: 120, backgroundColor: 'rgba(52, 52, 52, 0.0)', margin: 10}}>
                <Image
                  style={{width: 'auto', height: 160}}
                  source={{uri: 'http://image.tmdb.org/t/p/w185/' + item.poster_path}}
                />
                <Text
                  style={{
                    fontSize: 16,
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
