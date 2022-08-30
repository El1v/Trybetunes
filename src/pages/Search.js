import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistName: '',
    isDisabled: true,
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

  render() {
    const { artistName, isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
