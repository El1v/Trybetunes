import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

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
          <input
            name="name"
            value={ name }
            type="text"
            data-testid="edit-input-name"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <input
            name="email"
            value={ email }
            type="text"
            data-testid="edit-input-email"
            placeholder="E-mail"
            onChange={ this.handleChange }
          />
          <input
            name="description"
            value={ description }
            type="text"
            data-testid="edit-input-description"
            placeholder="Descricao"
            onChange={ this.handleChange }
          />
          <input
            name="image"
            value={ image }
            type="text"
            data-testid="edit-input-image"
            placeholder="Imagem"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ isDisabled }
            onClick={ this.handleUpdateUser }
          >
            Alterar
          </button>
        </form>);
    }

    let isRedirect;
    if (redirect) {
      isRedirect = (<Route><Redirect to="/profile" /></Route>);
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {profile}
        {isRedirect}
      </div>
    );
  }
}

export default ProfileEdit;
