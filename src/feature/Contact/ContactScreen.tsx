import React from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ContactScreenParams} from '../../common/Navigator';

export const ContactScreen = () => {
  const {navigate} = useNavigation<ContactScreenParams['navigation']>();

  return (
    <View>
      <Button title="Goto Home" onPress={() => navigate('Home')} />
      <Text>Contact</Text>
    </View>
  );
};
