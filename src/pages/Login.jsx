import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      nameInput: '',
      buttonIsDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  async handleChange(event) {
    const tres = 3;
    this.setState({ nameInput: event.target.value }, () => {
      if (event.target.value.length >= tres) {
        this.setState({ buttonIsDisabled: false });
      } else if (event.target.value.length < tres) {
        this.setState({ buttonIsDisabled: true });
      }
    });
  }

  render() {
    const { nameInput, buttonIsDisabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <input onChange={ this.handleChange } data-testid="login-name-input" />
        <button
          type="button"
          onClick={ async () => {
            this.setState({ loading: true });
            await createUser({ name: nameInput });
            this.setState({ redirect: true });
          } }
          disabled={ buttonIsDisabled }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
        { loading ? <h2>Carregando...</h2> : '' }
        { redirect ? <Redirect to="/search" /> : '' }
      </div>
    );
  }
}

export default Login;
