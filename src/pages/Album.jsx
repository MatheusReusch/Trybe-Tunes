import React from "react";
import Header from "../components/Header";
import getMusics from '../services/musicsAPI'

class Album extends React.Component {
  constructor() {
    super()

    this.state = {
      musicas: []
    }
  }
  
  async componentDidMount() {
    console.log(this.props.match.params.id)
    const musicas = await getMusics(this.props.match.params.id)
    this.setState({musicas: [...musicas]})
  }
  
  render() {
        return (
           <div data-testid="page-album">
             <h1>Album</h1>
             <Header />
             {this.state.musicas.length > 0 ? this.state.musicas.map((music, index) => index === 0 ? <div><h2 data-testid="artist-name">{music.artistName}</h2><h2 data-testid="album-name">{music.collectionName}</h2></div> : <div><h2>{music.trackName}</h2><audio data-testid="audio-component" src={ music.previewUrl } controls><track kind="captions" />
    O seu navegador não suporta o elemento <code>audio</code>.</audio></div>) : ''}
           </div>
        )
    }
}

export default Album