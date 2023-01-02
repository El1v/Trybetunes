import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  CardContent, CardMedia, IconButton, Typography, FormGroup, FormControlLabel, Checkbox,
} from '@mui/material';

class MusicCard extends React.Component {
  render() {
    const {
      previewUrl, trackName, trackId, onChange, checked, value, artworkUrl100,
    } = this.props;

    const MAX_LENGTH_NAME = 25;
    return (
      <Paper elevation={ 2 } width="300px" sx={ { display: 'flex', margin: '0.5rem' } }>

        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center' } }
        >

          <CardContent
            sx={ {
              flex: '1 0 auto',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center' } }
          >
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {trackName.length > MAX_LENGTH_NAME
                ? `${trackName.slice(0, MAX_LENGTH_NAME)}...` : trackName}
            </Typography>
          </CardContent>

          <Box sx={ { display: 'flex', alignItems: 'center', pl: 1, pb: 1 } }>
            <IconButton aria-label="play/pause">
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </IconButton>

          </Box>

          <FormGroup>
            <FormControlLabel
              control={ <Checkbox
                onChange={ onChange }
                checked={ checked }
                id={ trackId }
                name={ trackId }
                value={ value }
                size="small"
              /> }
              label={ checked ? 'Remover' : 'Favoritar' }
            />
          </FormGroup>
        </Box>

        <CardMedia
          component="img"
          sx={ { width: 151 } }
          image={ artworkUrl100 }
          alt="Live from space album cover"
          src={ previewUrl }
        />
      </Paper>

    // <div>
    //   <p>{trackName}</p>
    //   <audio data-testid="audio-component" src={ previewUrl } controls>
    //     <track kind="captions" />
    //     O seu navegador não suporta o elemento
    //     {' '}
    //     <code>audio</code>
    //     .
    //   </audio>
    //   <label htmlFor={ trackId }>
    //     Favorita
    //     <input
    //       data-testid={ `checkbox-music-${trackId}` }
    //       id={ trackId }
    //       type="checkbox"
    //       onChange={ onChange }
    //       checked={ checked }
    //       value={ value }
    //     />
    //   </label>
    // </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  artworkUrl100: PropTypes.string,
}.isRequired;

export default MusicCard;
