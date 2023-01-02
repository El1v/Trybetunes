import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import { CustomBoxAlbumList, CustomContentAlbum } from '../styles/album';

class Album extends React.Component {
  state = {
    data: [],
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchMusic();
    this.catchFavoritedSongs();
  }

  catchFavoritedSongs = async () => {
    this.setState({ isLoading: true });
    const favoritMusics = await getFavoriteSongs();
    const favoritMusicsTrackName = favoritMusics.map((element) => element.trackName);
    this.setState((prevState) => ({
      favoriteSongs: [...prevState.favoriteSongs, ...favoritMusicsTrackName],
      isLoading: false }));
  };

  fetchMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musicList = await getMusics(id);
    this.setState({ data: musicList });
  };

  fetchFavoritSong = async (e, element) => {
    this.setState({ isLoading: true });

    if (e.target.checked === false) {
      await removeSong(element);
      this.setState({ isLoading: false });
    }

    if (e.target.checked === true) {
      await addSong(element);
      this.setState({ isLoading: false });
    }
  };

  // Essa funcao foi com ajuda desse link -> https://contactmentor.com/checkbox-list-react-js-example/
  handleChange = async (e) => {
    const { favoriteSongs } = this.state;
    let updatedList = [...favoriteSongs];

    if (e.target.checked) {
      updatedList = [...favoriteSongs, e.target.value];
    } else {
      updatedList.splice(favoriteSongs.indexOf(e.target.value), 1);
    }
    this.setState({ favoriteSongs: updatedList });
  };

  render() {
    const { data, isLoading, favoriteSongs } = this.state;

    let albumList;

    if (isLoading === false) {
      albumList = (
        <CustomBoxAlbumList>
          {
            data.map((element, index) => (index === 0 ? (
              <CustomContentAlbum>
                <Stack key={ element.artistId } spacing={ 1 }>
                  <Typography
                    data-testid="artist-name"
                    gutterBottom
                    variant="h6"
                  >
                    {element.artistName}
                  </Typography>
                  <Typography
                    data-testid="album-name"
                    gutterBottom
                    variant="h6"
                  >
                    {element.collectionName}
                  </Typography>
                </Stack>
              </CustomContentAlbum>
            ) : (<MusicCard
              key={ element.trackId }
              trackName={ element.trackName }
              previewUrl={ element.previewUrl }
              artworkUrl100={ element.artworkUrl100 }
              trackId={ element.trackId }
              value={ element.trackName }
              onChange={ (e) => {
                this.handleChange(e);
                this.fetchFavoritSong(e, element);
              } }
              checked={ favoriteSongs.includes(element.trackName.toString()) }
            />)))
          }
        </CustomBoxAlbumList>);
    } else {
      albumList = <Loading />;
    }

    return (
      <div data-testid="page-album">
        <Header />
        {albumList}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
