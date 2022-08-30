import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    user: '',
    isDisabled: true,
    isLoading: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      const { user } = this.state;
      const minLoginName = 3;
      if (user.length >= minLoginName) {
        return this.setState({ isDisabled: false });
      }
      return this.setState({ isDisabled: true });
    });
  };

  render() {
    const { user, isDisabled, isLoading } = this.state;

    return (
      <div data-testid="page-login">
        <h1>TrybeTunes</h1>
        <input
          name="user"
          value={ user }
          type="text"
          placeholder="Nome"
          data-testid="login-name-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ async () => {
            this.setState({ isLoading: 'loading' });
            await createUser({ name: user });
            this.setState({ isLoading: 'redirect' });
          } }
        >
          Entrar
        </button>
        {isLoading === 'loading' && <Loading />}
        {isLoading === 'redirect' && <Route><Redirect to="/search" /></Route>}
      </div>
    );
  }
}

export default Login;
