import React from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenParams} from '../../common/Navigator';

export const HomeScreen = () => {
  const {navigate} = useNavigation<HomeScreenParams['navigation']>();

  return (
    <View>
      <Button title="Goto Contact" onPress={() => navigate('Contact')} />
      <Text>Home</Text>
    </View>
  );
};
