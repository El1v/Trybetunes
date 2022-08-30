import React from 'react';
import { Link } from 'react-router-dom';
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
    return (

      <header data-testid="header-component">
        {isLoading ? (
          <Loading />
        ) : (<p data-testid="header-user-name">{user.name}</p>)}
        <nav>
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
            </li>

            <li>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Musicas Favoritas
              </Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
