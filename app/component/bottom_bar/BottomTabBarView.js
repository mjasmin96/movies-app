import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../home/HomeScreen';
import SettingsView from '../settings/SettingsView';
import MovieCategoriesView from '../movies/MovieCategoriesView';
import MovieDetailsVeiw from '../movies/MovieDetailsVeiw';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  HomeDetails: MovieDetailsVeiw,
},{
  
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: "white"
    },
  },
});

HomeScreen.navigationOptions = {
  title: 'Home'
};

MovieDetailsVeiw.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('movie').title
  };
};

const SettingsStack = createStackNavigator({
  Settings: SettingsView,
});

const MoviesStack = createStackNavigator({
  Movies: MovieCategoriesView,
  Details: MovieDetailsVeiw,
});

const getTabBarIcon = (navigation, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `md-home`;
  } else if (routeName === 'Settings') {
    iconName = `md-settings`;
  } else if (routeName === 'Movies') {
    iconName = `md-film`;
  }

  return <IconComponent name={iconName} size={28} color={tintColor} />;
};

export default BottomTabBarView = createBottomTabNavigator(
  {
    Home: HomeStack,
    Movies: MoviesStack,
    Settings: SettingsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => getTabBarIcon(navigation, tintColor),
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
    tabBarOptions: {
      activeBackgroundColor: '#EF6C00',
      inactiveBackgroundColor: 'black',
      activeTintColor: '#fff',
      inactiveTintColor: '#c4b96c'
    },
  },
);
