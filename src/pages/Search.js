import { SearchTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack, TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import {
  CustomBoxErrorSearch,
  CustomSearchBox, CustomBoxResultSearch } from '../styles/search';

class Search extends React.Component {
  state = {
    artistName: '',
    lastArtistName: '',
    isDisabled: true,
    isLoading: false,
    result: false,
    data: [],
    firstLoading: true,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      const { artistName } = this.state;
      const minArtistName = 2;
      if (artistName.length >= minArtistName) {
        return this.setState({ isDisabled: false });
      }
      return this.setState({ isDisabled: true });
    });
  };

  fetchSearch = async () => {
    const { artistName } = this.state;
    this.setState({ isLoading: true, result: false, lastArtistName: artistName });
    const albumList = await searchAlbumsAPI(artistName);
    this.setState({ isLoading: false, result: true });
    // console.log(albumList);
    this.setState({ artistName: '', data: albumList, firstLoading: false });
  };

  render() {
    const {
      artistName,
      lastArtistName,
      isDisabled,
      isLoading,
      result,
      data,
      firstLoading,
    } = this.state;

    const MAX_LENGTH_NAME = 15;
    let searching;
    let resultSearch;

    // Mostra a mensagem com resultado dos albuns
    if (result) {
      resultSearch = (
        <Typography gutterBottom variant="h6">
          {`Resultado de álbuns de: ${lastArtistName}`}
        </Typography>
      );
    } else {
      resultSearch = (
        <p />
      );
    }
    // Faz a verificacao do isLoading
    if (isLoading === false) {
      searching = (
        <Stack direction="row" spacing={ 1 }>
          <TextField
            name="artistName"
            label="Nome do Artista"
            variant="outlined"
            value={ artistName }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <Button
            type="button"
            variant="contained"
            endIcon={ <SearchTwoTone /> }
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ async () => {
              this.fetchSearch();
            } }
          >
            Pesquisar
          </Button>
        </Stack>);
    }

    // faz a verificao se existe algum album
    let listaAlbuns;
    if (data.length > 0) {
      listaAlbuns = data.map((element) => (
        <Card key={ element.collectionName } sx={ { width: 245, margin: '0.5rem' } }>
          <CardMedia
            component="img"
            alt={ element.collectionName }
            height="140"
            image={ element.artworkUrl100 }
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {element.collectionName.length > MAX_LENGTH_NAME
                ? `${element.collectionName
                  .slice(0, MAX_LENGTH_NAME)}...` : element.collectionName}
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              data-testid={ `link-to-album-${element.collectionId}` }
              to={ `/album/${element.collectionId}` }
            >
              <Button size="small">Mais detalhes</Button>

            </Link>
          </CardActions>
        </Card>
      ));
    } else if (firstLoading === false) {
      listaAlbuns = (
        <CustomBoxErrorSearch>
          <Typography gutterBottom variant="h6">
            Oops... nenhum álbum foi encontrado
          </Typography>
        </CustomBoxErrorSearch>);
    }

    return (
      <Box data-testid="page-search">
        <Header />
        <CustomSearchBox>
          {searching}
        </CustomSearchBox>
        <CustomBoxResultSearch>
          {resultSearch}
        </CustomBoxResultSearch>
        <CustomBoxResultSearch>
          {listaAlbuns}
        </CustomBoxResultSearch>
      </Box>
    );
  }
}

export default Search;
