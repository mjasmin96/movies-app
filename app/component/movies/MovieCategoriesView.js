import React from 'react';
import {Dimensions} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {categories} from '../../constants/Movies';
import MoviesView from './MoviesView';

export default class MovieCategoriesView extends React.Component {
  state = {
    index: 0,
    routes: categories.map(k => {
      return {key: k, title: k};
    }),
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={({route}) => {
          return <MoviesView category={route.key} />;
        }}
        onIndexChange={index => this.setState({index})}
        initialLayout={{width: Dimensions.get('window').width}}
      />
    );
  }
}
