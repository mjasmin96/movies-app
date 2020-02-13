import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class Movie extends React.Component {
    render() {
        return (
            <View style={styles.main} >
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.push('Details', {
                            movie: this.props.movie,
                        });
                    }}>
                    <View style={styles.item}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'http://image.tmdb.org/t/p/w185/' + this.props.movie.poster_path }}
                        />
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >{this.props.movie.title}</Text>
                        <Text style={styles.popularity}>
                            {this.props.movie.popularity} views</Text>
                    </View>
                </TouchableOpacity >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#1a1919',
        justifyContent: 'space-around'
    },
    item: {
        backgroundColor: '#ffffff00',
        marginVertical: 12,
        marginHorizontal: 14,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: '#FFF176',
        fontWeight: 'bold',
    },
    popularity: {
        color: '#1976D2',
        fontSize: 14
    },
    image: {
        width: 150,
        height: 200,
        borderRadius: 12,
        marginBottom: 6
    }
});
