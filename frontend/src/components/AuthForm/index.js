import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import styles from './styles';
import Snackbar from '../Snackbar';

function SignIn(props) {
  const {
    classes,
    firstAction,
    secondAction,
    title,
    secondActionLink,
    Mutation,
  } = props;

  const [message, setSnackbarMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit(onSubmit) {
    return event => {
      event.persist();
      onSubmit({
        variables: {
          email,
          password,
        },
      });
      event.preventDefault();
    };
  }

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Snackbar
        open={!!message}
        message={message}
        setSnackbarMessage={setSnackbarMessage}
      />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Mutation onError={setSnackbarMessage}>
          {submit => (
            <form className={classes.form} onSubmit={handleSubmit(submit)}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Hasło</InputLabel>
                <Input
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Pamiętaj mnie"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {firstAction}
              </Button>
              <Button
                component={prop => <Link {...prop} to={secondActionLink} />}
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                {secondAction}
              </Button>
            </form>
          )}
        </Mutation>
      </Paper>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  firstAction: PropTypes.string.isRequired,
  secondAction: PropTypes.string.isRequired,
  secondActionLink: PropTypes.string.isRequired,
  Mutation: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignIn);
