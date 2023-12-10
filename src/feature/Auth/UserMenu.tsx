import React from 'react';
import {Divider, List} from 'react-native-paper';
import {useAppDispatch} from '../../common/redux';
import {ThemeSettings} from '../Settings/ThemeSettings';
import {logOut} from './authSlice';

export type UserMenuProps = {isAuthenticated: boolean};

export const UserMenu = ({isAuthenticated}: UserMenuProps) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <List.Section>
      <List.Item
        title="Theme"
        left={props => <List.Icon {...props} icon="palette" />}
        right={() => <ThemeSettings />}
        onPress={handleLogout}
      />
      {isAuthenticated && (
        <>
          <Divider />
          <List.Item
            title="Log out"
            left={props => <List.Icon {...props} icon="logout" />}
          />
        </>
      )}
    </List.Section>
  );
};
