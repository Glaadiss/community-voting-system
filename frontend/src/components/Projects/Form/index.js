import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles, TextField, Button, Switch } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Snackbar from '../../Snackbar';

const PROJECT_MUTATION = gql`
  mutation Mutation(
    $title: String!
    $description: String!
    $isPublished: Boolean!
    $image: String
  ) {
    createProject(
      data: {
        title: $title
        description: $description
        isPublished: $isPublished
        image: $image
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

function ProjectsForm(props) {
  const { classes } = props;
  const [message, setSnackbarMessage] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setPublished] = useState(false);
  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState(null);
  // const [file, setFile] = useState(null);
  const inputEl = useRef(null);

  function handleInput(e) {
    try {
      const file = e.currentTarget.files[0];
      setFileName(file.name);
      getBase64(file).then(setImage);
      getBase64(file).then(data => console.log(data));
    } catch (er) {
      //
    }
  }
  function handleSubmit(submit) {
    return () => {
      console.log(image);
      return submit({
        variables: {
          title,
          description,
          isPublished,
          image,
        },
      });
    };
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
        <Divider />
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload File
            {fileName && ` (${fileName})`}
            <input
              ref={inputEl}
              type="file"
              style={{ display: 'none' }}
              onChange={handleInput}
            />
          </Button>
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
          <Mutation
            mutation={PROJECT_MUTATION}
            onCompleted={() => {
              setTitle('');
              setDescription('');
              setSnackbarMessage('Project added');
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
                Dodaj Projekt!
              </Button>
            )}
          </Mutation>
        </Grid>
      </Grid>
    </form>
  );
}

ProjectsForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectsForm);

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
