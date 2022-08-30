import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    data: [],
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

  render() {
    const { data } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
          />)))
        }
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
