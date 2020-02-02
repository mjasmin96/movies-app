import React from 'react';
import { Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import HorizontalMoviesView from '../movies/HorizontalMoviesView';
import { movieData } from '../../constants/Movies';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }


  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading : false,
          movies : responseJson.movies
        },function(){})
      })
      .catch((error)=>{
        console.error(error);
      });
  }

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text>Home!</Text>
        <HorizontalMoviesView
          style={{ height: 100 }}
          movies={this.state.movies}
          navigation={this.props.navigation}
          detailScreen={"HomeDetails"}
        />
        <Button
          title="Go to Movies"
          onPress={() => this.props.navigation.navigate('Movies')}
        />
      </ScrollView>
    );
  }
}
