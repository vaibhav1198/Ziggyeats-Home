import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, withSnackbar } from 'notistack';

class App extends React.Component {
  handleClickVariant = variant => () => {
    // variant could be success, error, warning or info
    this.props.enqueueSnackbar('Restaurant name not found in database!!', { variant });
  };

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleClickVariant('error')}>Show warning snackbar</Button>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const MyApp = withSnackbar(App);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={2}>
      <MyApp />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;
