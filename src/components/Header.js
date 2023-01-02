import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { getUser } from '../services/userAPI';
// import Loading from '../pages/Loading';

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

  returnMenu = () => (
    <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
      <Link data-testid="link-to-search" to="/search">
        <Button
          sx={ { my: 2, color: 'white', display: 'block' } }
        >
          Pesquisa
        </Button>
      </Link>

      <Link data-testid="link-to-favorites" to="/favorites">
        <Button
          sx={ { my: 2, color: 'white', display: 'block' } }
        >
          Musicas Favoritas
        </Button>
      </Link>

      <Link data-testid="link-to-profile" to="/profile">
        <Button
          sx={ { my: 2, color: 'white', display: 'block' } }
        >
          Perfil
        </Button>
      </Link>
    </Box>
  );

  render() {
    const { user, isLoading } = this.state;
    return (

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {this.returnMenu()}
            <Typography
              data-testid="header-user-name"
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={ {
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              } }
            >
              {isLoading ? 'Carregando...' : user.name}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      // <header data-testid="header-component">
      //   {isLoading ? (
      //     <Loading />
      //   ) : (<p data-testid="header-user-name">{user.name}</p>)}

    //   <nav>
    //     <ul>
    //       <li>
    //         <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
    //       </li>

    //       <li>
    //         <Link
    //           data-testid="link-to-favorites"
    //           to="/favorites"
    //         >
    //           Musicas Favoritas
    //         </Link>
    //       </li>
    //       <li>
    //         <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
    );
  }
}

export default Header;
