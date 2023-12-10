import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {User} from '../../common/api/apiTypes';

export type UserBannerProps = {
  data?: User;
};

export const UserBanner = ({data}: UserBannerProps) => {
  if (!data) {
    return null;
  }

  const {firstName, image} = data;

  return (
    <View style={styles.wrapper}>
      <Avatar.Image source={{uri: image}} />
      <Text variant="headlineSmall">Howdy {firstName}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    columnGap: 16,
    alignItems: 'center',
    marginVertical: 28,
  },
});
