import { Avatar, Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { CustomContentProfile, CustomStackProfile } from '../styles/profile';

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
        <CustomStackProfile>
          <Avatar
            src={ user.image }
            alt={ `Foto de perfil de ${user.name}` }
            sx={ { width: 200, height: 200, marginTop: 10 } }
            data-testid="profile-image"
          />
          <Typography variant="h6" gutterBottom>{user.name}</Typography>
          <Typography variant="h6" gutterBottom>{user.email}</Typography>
          <Typography variant="h6" gutterBottom>{user.description}</Typography>
          <Link to="/profile/edit">
            <Button
              variant="text"
              fullWidth
              type="button"
            >
              Editar perfil
            </Button>
          </Link>
        </CustomStackProfile>
      );
    }

    return (
      <div data-testid="page-profile">
        <CustomContentProfile>
          <Header />
          {profile}
        </CustomContentProfile>
      </div>
    );
  }
}

export default Profile;
