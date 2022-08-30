import React from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { collectionImage, collectionName, artistName } = this.props;
    return (
      <div>
        <img src={ collectionImage } alt={ collectionName } />
        <p>{collectionName}</p>
        <p>{artistName}</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  collectionImage: PropTypes.string,
  collectionName: PropTypes.string,
  artistName: PropTypes.number,
}.isRequired;

export default AlbumCard;
