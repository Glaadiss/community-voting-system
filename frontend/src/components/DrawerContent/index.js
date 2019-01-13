import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
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
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
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
        },
      ];
    case 'operator':
      return [
        { text: 'Zobacz listę projektów', link: '/app/projects' },
        { text: 'Zobacz listę konkursów', link: '/app/contests' },
        { text: 'Utwórz nowy konkurs', link: '/app/contestForm' },
        { text: 'Utwórz nowy projekt', link: '/app/projectForm' },
        { text: 'Wyniki konkursów', link: '/app/scores' },
        { text: 'Generuj raport', link: '/app/generateRaport' },
      ];
    case 'admin':
      return [
        { text: 'Zobacz listę projektów', link: '/app' },
        { text: 'Utwórz nowy konkurs', link: '/app' },
        { text: 'Utwórz nowy projekt', link: '/app' },
        { text: 'wyniki zamkniętych konkursów', link: '/app' },
        { text: 'Edytuj zamknięty konkrurs', link: '/app' },
        { text: 'Generuj raport', link: '/app' },
      ];
    default:
      return [];
  }
}
