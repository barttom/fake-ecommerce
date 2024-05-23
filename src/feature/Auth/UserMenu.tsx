import React from 'react';
import {Divider, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../common/redux';
import {ThemeSettings} from '../Settings/ThemeSettings';
import {BasicSettingsScreenProps} from '../../common/components/Navigator';
import {logOut} from './authSlice';

export type UserMenuProps = {isAuthenticated: boolean};

export const UserMenu = ({isAuthenticated}: UserMenuProps) => {
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<BasicSettingsScreenProps['navigation']>();
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <List.Section>
      <List.Item
        title="Theme"
        left={props => <List.Icon {...props} icon="palette" />}
        right={() => <ThemeSettings />}
      />
      <List.Item
        title="Orders"
        left={props => <List.Icon {...props} icon="format-list-bulleted" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => navigate('Orders')}
      />
      {isAuthenticated && (
        <>
          <Divider />
          <List.Item
            title="Log out"
            left={props => <List.Icon {...props} icon="logout" />}
            onPress={handleLogout}
          />
        </>
      )}
    </List.Section>
  );
};
