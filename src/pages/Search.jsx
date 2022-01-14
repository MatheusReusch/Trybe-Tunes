import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      input: '',
      buttonIsDisabled: true,
      loading: false,
      artista: false,
      input2: '',
      albuns: ['Matheus'],
    };
  }

  handleChange(event) {
    this.setState({ input: event.target.value }, () => {
      if (event.target.value.length >= 2) {
        this.setState({ buttonIsDisabled: false });
      } else if (event.target.value.length < 2) {
        this.setState({ buttonIsDisabled: true });
      }
    });
  }

  async onButtonClick() {
    const { input } = this.state;
    this.setState((prevState) => ({ loading: true, input2: prevState.input }));
    const albums = await searchAlbumsAPI(input);
    this.setState({
      input: '',
      loading: false,
      artista: true,
      albuns: [...albums],
    });
    console.log(albums);
  }

  render() {
    const { loading, input, buttonIsDisabled, artista, input2, albuns } = this.state;
    const bla = 'Resultado de álbuns de: ';
    const resultado = bla + input2;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? (
          'Carregando...'
        ) : (
          <input
            value={ input }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
        )}
        { loading ? (
          ''
        ) : (
          <button
            type="button"
            onClick={ this.onButtonClick }
            disabled={ buttonIsDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        )}
        { artista && loading === false ? (
          <h3>{resultado}</h3>
        ) : (
          ''
        )}
        { albuns.length === 0 && 'Nenhum álbum foi encontrado'}
        { albuns.length > 1
        && albuns.map((album) => (
          <div key={ Math.random() }>
            <h2>{ album.artistName }</h2>
            <h2>{ album.collectionName }</h2>
            <img alt="imagem do album" src={ album.artworkUrl100 } />
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              Mais detalhes
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
