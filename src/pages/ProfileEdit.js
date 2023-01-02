import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';
import { CustomContentProfileEdit, CustomStackProfileEdit } from '../styles/profileEdit';

class ProfileEdit extends React.Component {
  state = {
    isLoading: true,
    isDisabled: true,
    redirect: false,
    userUpdated: {},
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const returnedUser = await getUser();
    this.setState({ isLoading: false, userUpdated: returnedUser });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState((prevState) => ({
      userUpdated: { ...prevState.userUpdated, [name]: value },
    }), () => {
      const { userUpdated } = this.state;
      const { name: nameUser, image, description, email } = userUpdated;

      let validateInputEmail;
      const validateInput = !!((nameUser.length >= 1)
        && (image.length >= 1) && (description.length >= 1) && (email.length >= 1));

      const validateEmail = (emailTeste) => emailTeste.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (validateEmail(email)) {
        validateInputEmail = true;
      } else {
        validateInputEmail = false;
      }

      this.setState({ isDisabled: true });

      if (validateInput && validateInputEmail) {
        this.setState({ isDisabled: false });
      }
    });
  };

  handleUpdateUser = async () => {
    const { userUpdated } = this.state;
    this.setState({ isLoading: true });
    await updateUser(userUpdated);
    this.setState({ isLoading: false, redirect: true });
  };

  render() {
    const { isLoading, userUpdated, isDisabled, redirect } = this.state;
    const { name, email, description, image } = userUpdated;

    let profile;

    if (isLoading) {
      profile = <Loading />;
    } else {
      profile = (
        <form>
          <CustomStackProfileEdit spacing={ 2 } sx={ { marginTop: 10 } }>
            <TextField
              name="name"
              label="Nome"
              variant="outlined"
              fullWidth="true"
              value={ name }
              type="text"
              data-testid="edit-input-name"
              onChange={ this.handleChange }
            />
            <TextField
              name="email"
              label="E-mail"
              variant="outlined"
              fullWidth="true"
              value={ email }
              type="text"
              data-testid="edit-input-email"
              onChange={ this.handleChange }
            />
            <TextField
              name="description"
              label="Descrição"
              variant="outlined"
              fullWidth="true"
              value={ description }
              type="text"
              data-testid="edit-input-description"
              onChange={ this.handleChange }
            />
            <TextField
              name="image"
              label="Url da Imagem"
              variant="outlined"
              fullWidth="true"
              value={ image }
              type="text"
              data-testid="edit-input-image"
              onChange={ this.handleChange }
            />
            <Button
              variant="contained"
              fullWidth="true"
              type="button"
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onClick={ this.handleUpdateUser }
            >
              Alterar
            </Button>
          </CustomStackProfileEdit>
        </form>);
    }

    if (redirect) return (<Redirect to="/profile" />);

    return (
      <div data-testid="page-profile-edit">
        <CustomContentProfileEdit>
          <Header />
          {profile}
        </CustomContentProfileEdit>
      </div>
    );
  }
}

export default ProfileEdit;
