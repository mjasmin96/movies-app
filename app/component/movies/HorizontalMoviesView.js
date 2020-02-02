import React from 'react';
import {Text, Image, FlatList, View, TouchableOpacity} from 'react-native';

export default class HorizontalMoviesView extends React.Component {
  render() {
    const movies = this.props.movies;
    return (
      <View style={{backgroundColor: '#ff0000', height: 200}}>
        <FlatList
          data={movies}
          horizontal={true}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.push(this.props.detailScreen, {
                  movie: item,
                });
              }}>
              <View
                style={{width: 100, backgroundColor: '#00ff00', margin: 10}}>
                <Image
                  style={{width: 'auto', height: 120}}
                  source={{uri: item.img}}
                />
                <Text
                  style={{
                    fontSize: 12,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                  }}>
                  {item.releaseYear}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
