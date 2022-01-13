import React from "react";
import { Redirect } from "react-router";
import { createUser } from '../services/userAPI'

class Login extends React.Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            nameInput: '',
            buttonIsDisabled: true,
            loading: false,
            redirect: false
        }
    }

    handleChange(event) {
      this.setState({nameInput: event.target.value}, () => {
        if (this.state.nameInput.length > 3) {
            this.setState({buttonIsDisabled: false})
        }
        else if (this.state.nameInput.length <= 3) {
            this.setState({buttonIsDisabled: true})
        }
      })
    }
    
    render() {
        return (
           <div data-testid="page-login">
            <input onChange={this.handleChange} data-testid="login-name-input" />
            <button onClick={async () => {
              this.setState({loading: true})
              await createUser({name: this.state.nameInput})
              this.setState({redirect: true})
            }} disabled={this.state.buttonIsDisabled} data-testid="login-submit-button">Entrar</button>
            {this.state.loading ? <h2>Carregando...</h2> : ''}
            {this.state.redirect ? <Redirect to='/search' /> : ''}
           </div>
        )
    }
}

export default Login
