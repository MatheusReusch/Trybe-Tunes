import React from 'react';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      pessoa: '',
    };
  }

  componentDidMount() {
    getUser().then((data) => this.setState({ pessoa: data }));
  }

  render() {
    const { pessoa } = this.state;
    return (
      <div data-testid="page-profile">
        <h1>Profile</h1>
        <Header />
        {pessoa !== '' ? <h2>{pessoa.name}</h2> : 'Carregando...'}
        {pessoa !== '' && <h2>{pessoa.description}</h2>}
        {pessoa !== '' && <h2>{pessoa.email}</h2>}
        {(pessoa !== '' && pessoa.image !== '')
        && <img alt="imagem da pessoa" data-testid="profile-image" src={ pessoa.image } />}
        <Link to='/profile/edit'>Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
