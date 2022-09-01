import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    isLoading: true,
    user: '',
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const returnedUser = await getUser();
    this.setState({ isLoading: false, user: returnedUser });
  };

  render() {
    const { isLoading, user } = this.state;
    let profile;

    if (isLoading) {
      profile = <Loading />;
    } else {
      profile = (
        <div>
          <Link to="/profile/edit"><p>Editar perfil</p></Link>
          <img
            src={ user.image }
            alt={ `Foto de perfil de ${user.name}` }
            data-testid="profile-image"
          />
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.description}</p>
        </div>
      );
    }

    return (
      <div data-testid="page-profile">
        <Header />
        {profile}
      </div>
    );
  }
}

export default Profile;
