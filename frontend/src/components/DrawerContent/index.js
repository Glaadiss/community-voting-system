import React from 'react';
import { AuthContext } from '../../App';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

export function DrawerContent() {
  return (
    <AuthContext.Consumer>
      {context => (
        <List>
          {getContentByRole(context.role).map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.toUpperCase()} />
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
      return ['Zobacz listę projektów'];
    case 'operator':
      return [
        'Zobacz listę projektów',
        'Utwórz nowy konkurs',
        'Utwórz nowy projekt',
        'wyniki zamkniętych konkursów',
        'Edytuj zamknięty konkrurs',
        'Generuj raport',
      ];
    case 'admin':
      return [
        'Zobacz listę projektów',
        'Utwórz nowy konkurs',
        'Utwórz nowy projekt',
        'wyniki zamkniętych konkursów',
        'Edytuj zamknięty konkrurs',
        'Generuj raport',
      ];
    default:
      return [];
  }
}
