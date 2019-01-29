import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Note from '@material-ui/icons/Note';
import Ballot from '@material-ui/icons/Ballot';
import NoteAdd from '@material-ui/icons/NoteAdd';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import DonutSmall from '@material-ui/icons/DonutSmall';
import EventNote from '@material-ui/icons/EventNote';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import GroupAdd from '@material-ui/icons/GroupAdd';
import { AuthContext } from '../../App';

export default function DrawerContent() {
  return (
    <AuthContext.Consumer>
      {context => (
        <List>
          {getContentByRole(context.role).map((item, index) => (
            <ListItem
              button
              key={item.text}
              component={props => <Link to={item.link} {...props} />}
            >
              <ListItemIcon>{item.Icon && <item.Icon />}</ListItemIcon>
              <ListItemText primary={item.text.toUpperCase()} />
            </ListItem>
          ))}
        </List>
      )}
    </AuthContext.Consumer>
  );
}

function getContentByRole(role) {
  switch (role) {
    case 'user':
      return [
        {
          link: '/app/contests',
          text: 'Zobacz listę projektów',
          Icon: Ballot,
        },
        { text: 'Wyniki konkursów', link: '/app/scores', Icon: DonutSmall },
      ];
    case 'operator':
      return [
        { text: 'Zobacz listę projektów', link: '/app/projects', Icon: Note },
        { text: 'Zobacz listę konkursów', link: '/app/contests', Icon: Ballot },
        {
          text: 'Utwórz nowy konkurs',
          link: '/app/contestForm',
          Icon: NoteAdd,
        },
        {
          text: 'Utwórz nowy projekt',
          link: '/app/projectForm',
          Icon: LibraryAdd,
        },
        { text: 'Wyniki konkursów', link: '/app/scores', Icon: DonutSmall },
        {
          text: 'Generuj raport',
          link: '/app/generateRaport',
          Icon: EventNote,
        },
      ];
    case 'admin':
      return [
        { text: 'Zobacz listę projektów', link: '/app/projects', Icon: Note },
        { text: 'Zobacz listę konkursów', link: '/app/contests', Icon: Ballot },
        {
          text: 'Utwórz nowy konkurs',
          link: '/app/contestForm',
          Icon: NoteAdd,
        },
        {
          text: 'Utwórz nowy projekt',
          link: '/app/projectForm',
          Icon: LibraryAdd,
        },
        { text: 'Wyniki konkursów', link: '/app/scores', Icon: DonutSmall },
        {
          text: 'Generuj raport',
          link: '/app/generateRaport',
          Icon: EventNote,
        },
        {
          text: 'Lista Użytkowników',
          link: '/app/users',
          Icon: SupervisorAccount,
        },
        {
          text: 'Dodaj Użytkownika',
          link: '/app/userForm',
          Icon: GroupAdd,
        },
      ];
    default:
      return [];
  }
}
