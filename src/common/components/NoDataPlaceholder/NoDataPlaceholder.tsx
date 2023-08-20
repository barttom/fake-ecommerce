import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export type NoDataPlaceholderProps = {message: string};

export const NoDataPlaceholder = ({message}: NoDataPlaceholderProps) => {
  return (
    <View style={styles.nodataContainer}>
      <Text variant="headlineLarge">¯\_(ツ)_/¯</Text>
      <Text variant="headlineSmall">{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nodataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
