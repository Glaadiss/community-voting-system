import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import SimpleTable from './SimpleTable';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '90%',
  },
});

function ImageGridList(props) {
  const { classes, lastContests, activeContests, bestProjects } = props;
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={280}
        className={classes.gridList}
        cols={4}
        spacing={20}
      >
        <GridListTile key="lastContests" cols={2}>
          <h2>Ostatnio dodane konkursy:</h2>
          <SimpleTable
            rows={lastContests}
            option="Data utworzenia"
            optionKey={el => new Date(el.startDate).toLocaleString()}
          />
        </GridListTile>
        <GridListTile key="/dashboard1.jpeg" cols={2}>
          <img src="/dashboard1.jpeg" alt="Last Contests" />
        </GridListTile>

        <GridListTile key="activeContests" cols={2}>
          <h2>Najbardziej aktywne konkursy:</h2>
          <SimpleTable
            rows={activeContests}
            option="Liczba głosów"
            optionKey={el => el.votes.length}
          />
        </GridListTile>
        <GridListTile key="/dashboard2.jpeg" cols={2}>
          <img src="/dashboard2.jpg" alt="Last Contests" />
        </GridListTile>
        <GridListTile key="Last contests" cols={2}>
          <h2>Najlepsze projekty:</h2>
          <SimpleTable
            rows={bestProjects}
            option="Liczba głosów"
            optionKey={el => el.votes.length}
          />
        </GridListTile>
        <GridListTile key="/dashboard3.jpg" cols={2}>
          <img src="/dashboard3.jpg" alt="Last Contests" />
        </GridListTile>
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  activeContests: PropTypes.array.isRequired,
  lastContests: PropTypes.array.isRequired,
  bestProjects: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);
