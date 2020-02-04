import React from 'react';
import { createAppContainer } from 'react-navigation';
import BottomTabBarView from './app/component/bottom_bar/BottomTabBarView';
import { StatusBar, View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const AppContainer = createAppContainer(BottomTabBarView);

export default class App extends React.Component {

    componentDidMount() {
        changeNavigationBarColor("black");
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <AppContainer />
            </View>)
    }
};