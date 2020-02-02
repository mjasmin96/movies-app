import React from 'react';
import {Text, View,} from 'react-native';

export default class MovieDetailsVeiw extends React.Component {
  render() {
    const movie = this.props.navigation.getParam('movie');
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Rating</Text>
        <Text>{movie.rate} *</Text>
      </View>
    );
  }
}
