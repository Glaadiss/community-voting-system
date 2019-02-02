import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter, Route, Link } from 'react-router-dom';
import styles from './styles';
import Contests from '../Contests';
import { AuthContext } from '../../App';
import DrawerContent from '../../components/DrawerContent';
import ContestsForm from '../Contests/form';
import Projects from '../Projects';
import ProjectsForm from '../Projects/form';
import Scores from '../Scores';
import Users from '../Users';
import UsersForm from '../Users/form';
import ContestProjects from '../Contests/contestProjects';
import ShowProject from '../Projects/show';
import Dashboard from '../Dashboard';

function Layout(props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchor] = useState(null);
  function handleMenu(event) {
    event.persist();
    setAnchor(event.target);
  }

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleClose() {
    setAnchor(null);
  }

  const { classes, theme } = props;

  const openRightIcon = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.grow}
            component={prop => (
              <Link to="/app" {...prop} style={{ textDecoration: 'none' }} />
            )}
          >
            Projekty Gminne
          </Typography>
          <IconButton
            aria-owns={openRightIcon ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={openRightIcon}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <AuthContext.Consumer>
              {context => (
                <MenuItem onClick={context.signout}>Wyloguj się!</MenuItem>
              )}
            </AuthContext.Consumer>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <DrawerContent />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/app/contests/:id/:projectId" component={ShowProject} />
        <Route path="/app/contests/:id" exact component={ContestProjects} />
        <Route path="/app/projects/:projectId" exact component={ShowProject} />
        <Route path="/app/contests" exact component={Contests} />
        <Route path="/app/projects" exact component={Projects} />
        <Route path="/app/contestForm" component={ContestsForm} />
        <Route path="/app/projectForm" component={ProjectsForm} />
        <Route path="/app/scores" component={Scores} />
        <Route path="/app/users" component={Users} />
        <Route path="/app/userForm" component={UsersForm} />
        <Route path="/app" exact component={Dashboard} />
      </main>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withRouter(Layout));
