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
  //   const [image, setImage] = useState('');
  const [isPublished, setPublished] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  return (
    <form>
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
              primary
              checked={isPublished}
              onChange={e => setPublished(e.target.checked)}
              value="checkedA"
            />
            Opublikowany?
          </Grid>
          <Divider />

          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Dodaj konkurs!
            </Button>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </form>
  );
}

ContestsForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContestsForm);
