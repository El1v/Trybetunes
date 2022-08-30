import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    user: '',
    isLoading: true,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const requestUser = await getUser();
    this.setState({ user: requestUser, isLoading: false });
  };

  render() {
    const { user, isLoading } = this.state;
    console.log(user);
    return (

      <header data-testid="header-component">
        {isLoading ? (
          <Loading />
        ) : (<p data-testid="header-user-name">{user.name}</p>)}
      </header>
    );
  }
}

export default Header;
