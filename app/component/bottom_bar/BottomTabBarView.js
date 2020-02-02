import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../home/HomeScreen';
import SettingsView from '../settings/SettingsView';
import MovieCategoriesView from '../movies/MovieCategoriesView';
import MovieDetailsVeiw from '../movies/MovieDetailsVeiw';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  HomeDetails: MovieDetailsVeiw,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsView,
});

const MoviesStack = createStackNavigator({
  Movies: MovieCategoriesView,
  Details: MovieDetailsVeiw,
});

class IconWithBadge extends React.Component {
  render() {
    const {name, badgeCount, color, size} = this.props;
    return (
      <View style={{width: 24, height: 24, margin: 5}}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  return <IconWithBadge {...props} badgeCount={2} />;
};

const getTabBarIcon = (navigation, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-home`;
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Settings') {
    iconName = `ios-settings`;
  } else if (routeName === 'Movies') {
    iconName = `ios-film`;
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
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => getTabBarIcon(navigation, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);
