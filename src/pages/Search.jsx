import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import searchAlbumsAPI from "../services/searchAlbumsAPI";

class Search extends React.Component {
    constructor() {
        super()
    this.handleChange = this.handleChange.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
    this.state = {
        input: '',
        buttonIsDisabled: true,
        loading: false,
        artista: false,
        input2: '',
        albuns: ['Matheus']
    }
    }

    handleChange(event) {
      this.setState({input: event.target.value}, () => {
          if (this.state.input.length >= 2) {
            this.setState({ buttonIsDisabled: false })
          }
          else if (this.state.input.length < 2) {
            this.setState({ buttonIsDisabled: true })
          }
      })
    }

    async onButtonClick() {
    this.setState((prevState) => ({loading: true, input2: prevState.input }))
    const albums = await searchAlbumsAPI(this.state.input)  
    this.setState((prevState) => ({input: '', loading: false, artista: true, albuns: [...albums]}))
    console.log(albums)
    }
    
    render() {
        return (
           <div data-testid="page-search">
            <Header />
             {this.state.loading ? 'Carregando...' : <input value={this.state.input} onChange={this.handleChange} data-testid="search-artist-input"></input>}
             {this.state.loading ? '' : <button onClick={this.onButtonClick} disabled={this.state.buttonIsDisabled} data-testid="search-artist-button">Pesquisar</button>}
             {this.state.artista && this.state.loading === false ? <h3>Resultado de álbuns de: {this.state.input2}</h3> : ''}
             {this.state.albuns.length === 0 && 'Nenhum álbum foi encontrado'}
             {this.state.albuns.length > 1 && this.state.albuns.map((album) => <div><h2>{album.artistName}</h2><img src={album.artworkUrl100} /><Link to={`/album/${album.collectionId}`} data-testid={`link-to-album-${album.collectionId}`}>Mais detalhes</Link></div>)}
           </div>
        )
    }
}

export default Search