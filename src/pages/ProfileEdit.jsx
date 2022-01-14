import React from 'react';
import { Redirect } from 'react-router';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.state = {
      pessoa: '',
      buttonIsDisabled: false,
      inputName: '',
      inputEmail: '',
      inputDesc: '',
      inputImg: '',
      loading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    getUser().then((data) => this.setState({
      pessoa: data,
      inputName: data.name,
      inputEmail: data.email,
      inputDesc: data.description,
      inputImg: data.image,
    }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const { inputName, inputEmail, inputDesc, inputImg } = this.state;
      if (inputName !== '' && inputEmail.includes('@') && inputEmail.includes('.com')
    && inputEmail !== '' && inputDesc !== '' && inputImg !== '') {
        this.setState({ buttonIsDisabled: false });
      } else {
        this.setState({ buttonIsDisabled: true });
      }
    });
  }

  onSaveButtonClick() {
    const { inputName, inputEmail, inputDesc, inputImg } = this.state;
    const objeto = {
      name: inputName,
      email: inputEmail,
      image: inputImg,
      description: inputDesc,
    };
    this.setState({ loading: true, redirect: true });
    updateUser(objeto);
  }

  render() {
    const { pessoa, buttonIsDisabled,
      inputName, inputDesc, inputEmail, inputImg, loading, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <h1>Editar perfil</h1>
        <Header />
        {pessoa === '' ? (
          'Carregando...'
        ) : (
          <section>
            <input
              onChange={ this.handleChange }
              name="inputName"
              type="text"
              data-testid="edit-input-name"
              value={ inputName }
            />
            <input
              onChange={ this.handleChange }
              name="inputEmail"
              type="text"
              data-testid="edit-input-email"
              value={ inputEmail }
            />
            <input
              onChange={ this.handleChange }
              name="inputDesc"
              type="text"
              data-testid="edit-input-description"
              value={ inputDesc }
            />
            <input
              onChange={ this.handleChange }
              name="inputImg"
              type="text"
              data-testid="edit-input-image"
              value={ inputImg }
            />
            <button
              type="button"
              disabled={ buttonIsDisabled }
              data-testid="edit-button-save"
              onClick={ this.onSaveButtonClick }
            >
              Salvar
            </button>
          </section>
        )}
        {loading && 'Carregando...'}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
