import * as React from 'react';
import {movieData} from '../../constants/Movies';
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { withNavigation } from 'react-navigation';

const MoviesView = props => (
  <View style={[styles.scene, {backgroundColor: '#3d3d29'}]}>
    <FlatList
      data={movieData.filter(function(e) {
        return e.category == props.category;
      })}
      renderItem={({item}) => <Movie movie={item} navigation={props.navigation}/>}
      keyExtractor={item => item.name}
    />
  </View>
);

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
      <Text style={styles.title}>{props.movie.name}</Text>
      <Text style={styles.title}>{props.movie.year}</Text>
      <Image
        style={{width: 'auto', height: 450}}
        source={{uri: props.movie.img}}
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
