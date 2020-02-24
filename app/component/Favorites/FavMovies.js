import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import Movie from '../movies/MoviefromGenre';
var SharedPreferences = require('react-native-shared-preferences');

class FavMovies extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
        this.loadFavoriteMovies = this.loadFavoriteMovies.bind(this);
    }

    loadFavoriteMovies = () => {
        SharedPreferences.getItem("favorites", (value) => {
            if (value == undefined) {
                value = "[]";
            }
            var favoritesList = JSON.parse(value);
            this.setState({
                isLoading: false,
                movielist: favoritesList,
            }, function () { })
    
        });
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (!nextProps.isFocused) {
            this.loadFavoriteMovies();
          return true;
        }
        return false;
    }

    componentDidMount() {
        this.loadFavoriteMovies();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        const movieData = this.state.movielist;

        return (
            <View style={{ backgroundColor: '#1a1919', flex: 1 }}>
                <FlatList
                    data={movieData}
                    renderItem={({ item }) => <Movie movie={item} navigation={this.props.navigation}
                        detailsScreen={"FavMovieDetails"} />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                />
            </View>
        );
    }
};



export default withNavigation(FavMovies);