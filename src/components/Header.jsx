import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      nome: [],
    };
  }

  componentDidMount() {
    getUser().then((data) => this.setState({ nome: data }));
  }

  render() {
    const { nome } = this.state;
    const { name } = nome;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        {nome.length !== 0 ? (
          <h3 data-testid="header-user-name">{name}</h3>
        ) : (
          'Carregando...'
        )}
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
