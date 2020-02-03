import React from 'react';
import {Text, Image, FlatList, View, TouchableOpacity} from 'react-native';

export default class HorizontalMoviesView extends React.Component {
  render() {
    const movies = this.props.movies;
    return (
      <View style={{backgroundColor: '#86cae3', height: 240}}>
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
                style={{width: 120, backgroundColor: 'rgba(52, 52, 52, 0.2)', margin: 10}}>
                <Image
                  style={{width: 'auto', height: 120}}
                  source={{uri: item.img}}
                />
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    margin: 10
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
