import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '80%',
    marginLeft: '10%',
    textAlign: 'center',
  },
});

function Info(props) {
  const { classes } = props;
  const { title, description, image, Button } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {title}
        </Typography>
        <br />
        <Typography component="p">{description}</Typography>
        {image && <img src={image} width={300} alt={title} />}
        <br />
        {Button}
      </Paper>
    </div>
  );
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(Info);
