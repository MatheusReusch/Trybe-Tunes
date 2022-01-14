import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import {
  addSong,
  removeSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicas: [],
      loading: false,
      loading2: true,
      favoritadas: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    console.log(id);
    const musicas = await getMusics(id);
    this.primeiroSetState(musicas);
    const favoritadas = await getFavoriteSongs();
    console.log(favoritadas);
    this.segundoSetState(favoritadas);
  }

  primeiroSetState = (musicas) => {
    this.setState({ musicas: [...musicas] });
  }

  segundoSetState = (favoritadas) => {
    this.setState({ loading2: false, favoritadas: [...favoritadas] });
  }

  async addMusica(music, event) {
    if (event.target.checked === true) {
      this.setState({ loading: true });
      await addSong(music);
      const favoritadas = await getFavoriteSongs();
      this.setState({ loading: false, favoritadas: [...favoritadas] });
    } else if (event.target.checked === false) {
      this.setState({ loading: true });
      await removeSong(music);
      const favoritadas = await getFavoriteSongs();
      this.setState({ loading: false, favoritadas: [...favoritadas] });
    }
  }

  render() {
    const { loading2, loading, musicas, favoritadas } = this.state;
    return (
      <div data-testid="page-album">
        <h1>Album</h1>
        <Header />
        {loading && 'Carregando...'}
        {musicas.length > 0
          ? musicas.map((music, index) => (index === 0 ? (
            <div>
              <h2 data-testid="artist-name">{music.artistName}</h2>
              <h2 data-testid="album-name">{music.collectionName}</h2>
            </div>
          ) : (
            <div>
              <h2>{music.trackName}</h2>
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor="input">
                Favorita
                <input
                  id="input"
                  type="checkbox"
                  checked={ favoritadas.find(
                    (mus) => mus.trackId === music.trackId,
                  ) }
                  onChange={ (event) => {
                    this.addMusica(music, event);
                  } }
                  data-testid={ `checkbox-music-${music.trackId}` }
                />
              </label>
            </div>
          )
          ))
          : ''}
        {loading2 && 'Carregando...'}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.arrayOf(propTypes.object).isRequired,
  params: propTypes.arrayOf(propTypes.object).isRequired,
  id: propTypes.number.isRequired,
};

export default Album;
