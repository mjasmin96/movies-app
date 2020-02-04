import React from 'react';
import { Text, View, } from 'react-native';

export default class MovieDetailsVeiw extends React.Component {
  render() {
    const movie = this.props.navigation.getParam('movie');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 36}}>
        <Text style = {{fontWeight: 'bold', margin: 10}}>OVERVIEW</Text>
        <Text>{movie.overview}</Text>
      </View>
    );
  }
}
