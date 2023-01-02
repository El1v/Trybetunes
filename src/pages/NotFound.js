import React from 'react';
import CustomNotFound from '../styles/notFound';

class NotFound extends React.Component {
  render() {
    return (
      <CustomNotFound data-testid="page-not-found">
        <img width={ 700 } src="/assets/notFound.jpg" alt="" />
      </CustomNotFound>
    );
  }
}

export default NotFound;
