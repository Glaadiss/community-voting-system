import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import { withStyles, TextField, Button, Switch } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Snackbar from '../../Snackbar';
import Autocomplete from '../../Autocomplete';

export const GET_PROJECTS = gql`
  {
    projects {
      id
      title
      isPublished
    }
  }
`;

const CONTEST_MUTATION = gql`
  mutation Mutation(
    $title: String!
    $description: String!
    $isPublished: Boolean!
    $startDate: DateTime!
    $endDate: DateTime!
    $projects: [ID!]
  ) {
    createContest(
      data: {
        title: $title
        description: $description
        isPublished: $isPublished
        startDate: $startDate
        endDate: $endDate
        projects: $projects
      }
    ) {
      id
    }
  }
`;

const styles = theme => ({
  grid: {
    marginLeft: '40px',
    marginTop: '20px',
    width: '400px',
  },
});

function ContestsForm(props) {
  const { classes } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setSnackbarMessage] = useState('');
  const [isPublished, setPublished] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  function handleSubmit(submit) {
    return () =>
      submit({
        variables: {
          title,
          description,
          isPublished,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          projects,
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              id="standard-name"
              label="Tytuł"
              className={classes.textField}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="standard-multiline-flexible"
              label="Opis"
              multiline
              rowsMax="4"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              margin="normal"
              label="Początek"
              value={startDate}
              onChange={setStartDate}
            />
          </Grid>
          <Grid item xs={6}>
            <TimePicker
              margin="normal"
              label=" "
              value={startTime}
              onChange={setStartTime}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              margin="normal"
              label="Koniec"
              value={endDate}
              onChange={setEndDate}
            />
          </Grid>
          <Grid item xs={6}>
            <TimePicker
              margin="normal"
              label=" "
              value={endTime}
              onChange={setEndTime}
            />
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Switch
              fullWidth
              checked={isPublished}
              onChange={e => setPublished(e.target.checked)}
              value="checkedA"
            />
            Opublikowany?
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Query query={GET_PROJECTS} pollInterval={10000}>
              {({ loading, error, data }) => {
                const suggestions =
                  loading || !data || error
                    ? []
                    : getAutocompleteProjects(data);
                return (
                  <Autocomplete
                    suggestions={suggestions}
                    setProjects={setProjects}
                  />
                );
              }}
            </Query>
          </Grid>

          <Grid item xs={12}>
            <Mutation
              mutation={CONTEST_MUTATION}
              onCompleted={() => {
                setTitle('');
                setDescription('');
                setSnackbarMessage('Contest added');
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
                  Dodaj Konkurs!
                </Button>
              )}
            </Mutation>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </form>
  );
}

ContestsForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function getAutocompleteProjects(data) {
  return data.projects
    .filter(el => el.isPublished)
    .map(el => ({
      label: el.title,
      value: el.id,
    }));
}

export default withStyles(styles)(ContestsForm);
