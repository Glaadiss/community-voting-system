import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import {
  withStyles,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Snackbar from '../../Snackbar';

const prepareUserMutation = mutationType => gql`
  mutation Mutation(
    $email: String!
    $name: String
    $pesel: String
    $postalCode: String
    $password: String!
  ) {
    ${mutationType}(
      data: {
        email: $email
        name: $name
        pesel: $pesel
        postalCode: $postalCode
        password: $password
      }
    ) {
      user {
        id
      }
    }
  }
`;

const styles = theme => ({
  grid: {
    marginLeft: '40px',
    marginTop: '20px',
    width: '400px',
  },
  root: {
    width: '90%',
    marign: '5%',
  },
});

function UserForm(props) {
  const { classes } = props;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [pesel, setPesel] = useState('');
  const [message, setSnackbarMessage] = useState('');
  const [role, setRole] = useState('createUser');
  function handleSubmit(submit) {
    return () =>
      submit({
        variables: {
          email,
          name,
          password,
          pesel,
          postalCode,
        },
      });
  }
  return (
    <form>
      <Snackbar
        open={!!message}
        message={message}
        setSnackbarMessage={setSnackbarMessage}
      />
      <Grid
        spacing={40}
        container
        className={classes.grid}
        justify="space-around"
        alignItems="baseline"
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-password"
            label="Password"
            type="password"
            className={classes.textField}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-pesel"
            label="Pesel"
            className={classes.textField}
            value={pesel}
            onChange={e => setPesel(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-postal-code"
            label="PostalCode"
            className={classes.textField}
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <Select
            value={role}
            onChange={e => setRole(e.target.value)}
            fullWidth
          >
            <MenuItem value="createUser">User</MenuItem>
            <MenuItem value="createOperator">Operator</MenuItem>
            <MenuItem value="createAdmin">Admin</MenuItem>
          </Select>
        </Grid>

        <Divider />
        <Grid item xs={12}>
          <Mutation
            mutation={prepareUserMutation(role)}
            onCompleted={() => {
              setEmail('');
              setName('');
              setPassword('');
              setPesel('');
              setPostalCode('');
              setRole('createUser');
              setSnackbarMessage('User added');
            }}
            onError={err => setSnackbarMessage(err.message)}
          >
            {submit => (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit(submit)}
              >
                Add User!
              </Button>
            )}
          </Mutation>
        </Grid>
      </Grid>
    </form>
  );
}

UserForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserForm);
