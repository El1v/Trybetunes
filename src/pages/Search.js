import React from 'react';
import { Link } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistName: '',
    lastArtistName: '',
    isDisabled: true,
    isLoading: false,
    result: false,
    data: [],
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
    this.setState({ artistName: '', data: albumList });
  };

  render() {
    const {
      artistName,
      lastArtistName,
      isDisabled,
      isLoading,
      result,
      data,
    } = this.state;

    let searching;
    let resultSearch;

    // Mostra a mensagem com resultado dos albuns
    if (result) {
      resultSearch = (
        <p>
          {`Resultado de álbuns de: ${lastArtistName}`}
        </p>
      );
    } else {
      resultSearch = (
        <p />
      );
    }
    // Faz a verificacao do isLoading
    if (isLoading === false) {
      searching = (
        <div>
          <input
            name="artistName"
            value={ artistName }
            type="text"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ async () => {
              this.fetchSearch();
            } }
          >
            Pesquisar
          </button>
        </div>);
    }
    // faz a verificao se existe algum album
    let listaAlbuns;
    if (data.length > 0) {
      listaAlbuns = data.map((element) => (
        <div key={ element.collectionId }>
          <AlbumCard
            collectionImage={ element.artworkUrl100 }
            artistName={ element.artistName }
          />
          <Link
            data-testid={ `link-to-album-${element.collectionId}` }
            to={ `/album/${element.collectionId}` }
          >
            {element.collectionName}
          </Link>
        </div>
      ));
    } else {
      listaAlbuns = <p>Nenhum álbum foi encontrado</p>;
    }

    return (
      <div data-testid="page-search">
        <Header />
        {searching}
        {resultSearch}
        {listaAlbuns}
      </div>
    );
  }
}

export default Search;
