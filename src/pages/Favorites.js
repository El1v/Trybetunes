import React from 'react';
import { Typography } from '@mui/material';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { CustomBoxAlbumList } from '../styles/album';

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
        <CustomBoxAlbumList>
          {/* {console.log(favoriteSongs.length)} */}
          {favoriteSongs.map((element) => (
            <MusicCard
              previewUrl={ element.previewUrl }
              key={ element.trackId }
              trackName={ element.trackName }
              trackId={ element.trackId }
              artworkUrl100={ element.artworkUrl100 }
              value={ element.trackName }
              onChange={ () => this.removeSong(element) }
              checked={ favoriteSongsTrackName.includes(element.trackName.toString()) }
            />
          )) }
        </CustomBoxAlbumList>);
    } else {
      favorites = <Loading />;
    }

    if (favoriteSongs.length === 0) {
      favorites = (
        <Typography gutterBottom variant="h6">
          Oops... parece que você não favoritou nenhuma música ainda
        </Typography>);
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <CustomBoxAlbumList>
          {favorites}
        </CustomBoxAlbumList>
      </div>
    );
  }
}

export default Favorites;
