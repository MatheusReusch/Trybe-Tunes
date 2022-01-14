import React from 'react';
import Header from '../components/Header';
import {
  getFavoriteSongs,
  addSong,
  removeSong,
} from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoritas: [],
    };
  }

  async componentDidMount() {
    this.primeiroSetState();
    const favoritas = await getFavoriteSongs();
    this.segundoSetState(favoritas);
  }

  primeiroSetState() {
    this.setState({ loading: true });
  }

  segundoSetState(favoritas) {
    this.setState({ loading: false, favoritas: [...favoritas] });
  }

  async addMusica(music, event) {
    console.log(event.target.value);
    console.log(event.target.checked === false);
    if (event.target.checked === true) {
      this.setState({ loading: true });
      await addSong(music);
      const favoritadas = await getFavoriteSongs();
      this.setState({ loading: false, favoritas: [...favoritadas] });
    } else if (event.target.checked === false) {
      this.setState({ loading: true });
      await removeSong(music);
      const favoritadas = await getFavoriteSongs();
      this.setState({ loading: false, favoritas: [...favoritadas] });
    }
  }

  render() {
    const { loading, favoritas } = this.state;
    return (
      <div data-testid="page-favorites">
        <h1>Favorites</h1>
        <Header />
        { loading && 'Carregando...'}
        { favoritas.length > 0
        && favoritas.map((music) => (
          <section key={ Math.random() }>
            <div>
              <h2 data-testid="artist-name">{music.artistName}</h2>
              <h2 data-testid="album-name">{music.collectionName}</h2>
            </div>
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
              <label htmlFor="input2">
                Favorita
                <input
                  id="input2"
                  type="checkbox"
                  checked={ favoritas.find(
                    (mus) => mus.trackId === music.trackId,
                  ) }
                  onChange={ (event) => {
                    this.addMusica(music, event);
                  } }
                  data-testid={ `checkbox-music-${music.trackId}` }
                />
              </label>
            </div>
          </section>
        ))}
      </div>
    );
  }
}

export default Favorites;
