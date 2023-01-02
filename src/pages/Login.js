import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import {
  CustomContentLogin,
  CustomAsideLogin,
  CustomFormLogin,
  CustomStackLogin,
  CustomImage,
} from '../styles/login';

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
      <CustomContentLogin data-testid="page-login">
        {/* <h1>TrybeTunes</h1> */}
        <CustomAsideLogin>
          <img width={ 700 } src="/assets/ilustracao.jpg" alt="" />
        </CustomAsideLogin>

        <CustomFormLogin elevation={ 3 }>
          <CustomStackLogin spacing={ 2 }>
            <CustomImage width={ 200 } src="/assets/icon.jpg" alt="" />
            <TextField
              id="user"
              label="Nome"
              variant="outlined"
              name="user"
              fullWidth
              value={ user }
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />

            <Button
              variant="contained"
              data-testid="login-submit-button"
              fullWidth
              disabled={ isDisabled }
              onClick={ async () => {
                this.setState({ isLoading: 'loading' });
                await createUser({ name: user });
                this.setState({ isLoading: 'redirect' });
              } }
            >
              Entrar
            </Button>
            {isLoading === 'loading' && <Loading />}
            {isLoading === 'redirect' && <Route><Redirect to="/search" /></Route>}
          </CustomStackLogin>
        </CustomFormLogin>
      </CustomContentLogin>
    );
  }
}

export default Login;
