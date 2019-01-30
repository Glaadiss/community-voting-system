import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function ContestTable(props) {
  const { classes, rows, match } = props;
  const {
    params: { id },
  } = match;
  const isVote = rows[0] && rows[0].votes;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Photo</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Published?</TableCell>
            {isVote && <TableCell>Votes</TableCell>}
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.image && (
                  <img src={row.image} width={100} height={100} alt="Content" />
                )}
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>{row.title}</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>{row.description}</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.isPublished ? (
                  <strong style={{ color: 'green', fontSize: 20 }}>
                    {'\u2713'}
                  </strong>
                ) : (
                  <span style={{ color: 'red', fontSize: 20 }}>{'\u2716'}</span>
                )}
              </TableCell>
              {isVote && (
                <TableCell component="th" scope="row">
                  <strong>{row.votes.length}</strong>
                </TableCell>
              )}
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  component={prop =>
                    id ? (
                      <Link to={`/app/contests/${id}/${row.id}`} {...prop} />
                    ) : (
                      <Link to={`/app/projects/${row.id}`} {...prop} />
                    )
                  }
                >
                  Show
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

ContestTable.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
};

export default withStyles(styles)(ContestTable);
