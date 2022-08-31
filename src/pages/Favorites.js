import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    isLoading: true,
    favoriteSongs: [],
    favoriteSongsTrackName: [],
  };

  componentDidMount() {
    this.catchFavoritedSongs();
  }

  // componentDidUpdate() {
  //   this.catchFavoritedSongs();
  // }

  catchFavoritedSongs = async () => {
    this.setState({ isLoading: true });

    const favoritMusics = await getFavoriteSongs();
    const favoriteMusicsTrackName = favoritMusics.map((element) => element.trackName);

    this.setState({
      favoriteSongs: [...favoritMusics],
      favoriteSongsTrackName:
        [...favoriteMusicsTrackName],
      isLoading: false });
  };

  removeSong = async (element) => {
    this.setState({ isLoading: true });
    await removeSong(element);
    this.setState({ isLoading: false });
    this.catchFavoritedSongs();
  };

  render() {
    const { isLoading, favoriteSongs, favoriteSongsTrackName } = this.state;
    let favorites;

    if (isLoading === false) {
      favorites = (
        <div>
          {/* {console.log(favoriteSongs.length)} */}
          {favoriteSongs.map((element) => (
            <MusicCard
              key={ element.trackId }
              trackName={ element.trackName }
              trackId={ element.trackId }
              value={ element.trackName }
              onChange={ () => this.removeSong(element) }
              checked={ favoriteSongsTrackName.includes(element.trackName.toString()) }
            />
          )) }
        </div>);
    } else {
      favorites = <Loading />;
    }

    return (
      <div data-testid="page-favorites">
        <Header />
        {favorites}
      </div>
    );
  }
}

export default Favorites;
