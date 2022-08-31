import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    data: [],
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musicList = await getMusics(id);
    this.setState({ data: musicList });
  };

  fetchFavoritSong = async (element) => {
    this.setState({ isLoading: true });
    await addSong(element);
    this.setState({ isLoading: false });
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
        <div>
          {
            data.map((element, index) => (index === 0 ? (
              <div key={ element.artistId }>
                <p data-testid="artist-name">{element.artistName}</p>
                <p data-testid="album-name">{element.collectionName}</p>
              </div>
            ) : (<MusicCard
              key={ element.trackId }
              trackName={ element.trackName }
              previewUrl={ element.previewUrl }
              trackId={ element.trackId }
              value={ element.trackName }
              onChange={ (e) => {
                this.handleChange(e);
                this.fetchFavoritSong(element, element.trackId);
              } }
              checked={ favoriteSongs.includes(element.trackName.toString()) }
            />)))
          }
        </div>);
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
