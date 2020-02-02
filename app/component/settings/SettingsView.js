import React from 'react';
import {Text, View, Button} from 'react-native';

export default class SettingsView extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
        <Button
          title="Go Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}
 