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

function UsersTable(props) {
  const { classes, rows } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Pesel</TableCell>
            <TableCell>Postal Code</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <strong>{row.email}</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>{row.role}</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>{row.name}</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>{row.pesel}</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>{row.postalCode}</strong>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  component={prop => (
                    <Link to={`/app/users/${row.id}`} {...prop} />
                  )}
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

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
};

export default withStyles(styles)(UsersTable);
