import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Trailer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {

        const movie = this.props.navigation.getParam('movie');

        fetch('https://api.themoviedb.org/3/movie/' + movie.id + '/videos?api_key=69b647428d7297b0b48fefdcd076b625&language=en-US')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    movietrailer: responseJson.results[0],
                }, function () { })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
                <TouchableOpacity
                    onPress={() => {
                        const movietrailer = this.state.movietrailer;
                        Linking.canOpenURL('https://www.youtube.com/watch?v=' + movietrailer.key)
                            .then((supported) => {
                                if (!supported) {
                                    console.log("Can't handle url: " + 'https://www.youtube.com/watch?v=' + movietrailer.key);
                                } else {
                                    return Linking.openURL('https://www.youtube.com/watch?v=' + movietrailer.key);
                                }
                            })
                            .catch((err) => console.error('An error occurred', err));
                    }}
                    style={{ width: 64, height: 64, position: 'absolute', alignSelf: 'center', top: 86 }}>
                    <Ionicons name={'md-play'} size={64}
                        style={{ position: 'relative', alignSelf: 'center', color: 'white' }}>
                    </Ionicons>
                </TouchableOpacity>
        )
    }
}